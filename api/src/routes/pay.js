const { Router } = require("express");
const Stripe = require("stripe");
const { User, Product, Sell_order } = require("../db");
const { Op } = require("sequelize");
const stripe = new Stripe("sk_test_51LDapSLLyNiW7nbRhEOHcLQfx1muclzGM39fTvok1XgfvSbdgHF0t9tpytNGb8DgtorDUsoRtUqArlmUiNwoedu2005lvflXcg");
const router = Router();

//
router.post("/api/checkout", async (req, res) => {
    // you can get more data to find in a database, and so on
    const { id, amount , description, user, shippingInfo} = req.body;
    //sacarle el ultimo elemento, que son los datos de envio

    try {
      const userComprador = await User.findByPk(user)//trae el user que compro
      if(user){
        const payment = await stripe.paymentIntents.create({
          amount:amount*100,
          currency: "USD",
          description: description.map(p=>p.name + ': ' +p.quantity).join(' '),
          payment_method: id,
          confirm: true, //confirm the payment at the same time
        });
        console.log(userComprador)
        if(payment.status === 'succeeded'){
          const newSellOrder = await Sell_order.create({
            amount:amount*100,
            product:description.map(p=>p.name + ': ' +p.quantity).join(','),
            country:shippingInfo.country,
            province:shippingInfo.province,
            city:shippingInfo.city,
            street:shippingInfo.street,
            postalCode:shippingInfo.postalCode
          })
          const userCompra = await Promise.all(description.map(async (p)=>{
            return await Product.findByPk(p.id)
          }))
          newSellOrder.addProducts(userCompra)
          userComprador.addSell_order(newSellOrder)
        }
      }
      else return res.json({ message: "hubo un error"})
  
      return res.status(200).json({ message: "Successful Payment" });
    } catch (error) {
      console.log(error);
      return res.json({ message: "hubo un error"/* error.raw.message */ });
    }
  });

  module.exports = router;