const { Router } = require("express");
const Stripe = require("stripe");
//const { default: ProductCard } = require("../../../client/src/components/ProductCard/ProductCard");
const { User, Product } = require("../db");
const { Op } = require("sequelize");
const stripe = new Stripe("sk_test_51LDapSLLyNiW7nbRhEOHcLQfx1muclzGM39fTvok1XgfvSbdgHF0t9tpytNGb8DgtorDUsoRtUqArlmUiNwoedu2005lvflXcg");
const router = Router();

//
router.post("/api/checkout", async (req, res) => {
    // you can get more data to find in a database, and so on
    const { id, amount , description, user} = req.body;

    try {
      
      const payment = await stripe.paymentIntents.create({
        amount:amount*100,
        currency: "USD",
        description: description.map(p=>p.name).join(' '),
        payment_method: id,
        confirm: true, //confirm the payment at the same time
        receipt_email: 'agustineg@hotmail.com',
        //costumer: 'asdfasdfsadfasdf'
        //costumer desde stripe para mandarle el id del usuario de la bd
      });
      const userId = await User.findByPk(user)//funciona
      //REVISAR
      const userCompra = await Promise.all(description.map(async p=>await Product.findAll({where: {
        name: {
          [Op.iLike]: `%${p.name}%`,
        },
      }})));
      const allProducts = await Product.findAll({where:{name:'SUDADERA ADIDAS'}})
      console.log(allProducts)
      //console.log(payment);
  
      return res.status(200).json({ message: "Successful Payment" });
    } catch (error) {
      console.log(error);
      return res.json({ message: "hubo un error"/* error.raw.message */ });
    }
  });

  module.exports = router;