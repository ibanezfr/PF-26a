const { Router } = require("express");
const Stripe = require("stripe");
const { User, Product, Sell_order, Product_values } = require("../db");
const { Sequelize } = require('sequelize');
const { Op } = require("sequelize");
const apiKey = process.env.API_KEY_STRIPE
const stripe = new Stripe(apiKey);
const router = Router();
const { mailPayment } = require("../middlewares/middlewares.js");
//const Product_values = require("../models/Product_values");
const cp = require('cookie-parser');



//
function formatDescription(description) {
  return description.map(p => p.name + ' ' + p.size + ' ' + p.quantity + ' price ' + p.price + ' subTotal ' + p.price * p.quantity)
}

router.post("/api/checkout", async (req, res) => {
  // you can get more data to find in a database, and so on

    const { amount , description, user, shippingInfo} = req.body;
    console.log(amount , description, user, shippingInfo)
  try {
      const userComprador = await User.findByPk(user)

      if(user){
      const payment = await stripe.paymentIntents.create({
          amount:Number(amount)*100,
          currency: "USD",
          description: formatDescription(description).join(',\n'),
          // payment_method: id,
          automatic_payment_methods: {
            enabled: true
          },
          //confirm: true, //confirm the payment at the same time
          //return_url: 'http://localhost:3000/'
        });

        
        if(payment.status === 'succeeded'){
          const newSellOrder = await Sell_order.create({
            amount:amount*100,
            product:formatDescription(description).join('\n'),
            country:shippingInfo.country,
            province:shippingInfo.province,
            city:shippingInfo.city,
            postalCode:shippingInfo.postalCode
          })
       
          let userCompra=[]
          if(description.length>1){
            userCompra = await Promise.all(description.map(async (p)=>{
              return await Product.findByPk(p.id, {include:[{
                model: Product_values,
                where:{size:p.size},
                attributes: ["id"],
                through: { attributes: [] }
              }]})
            }))

            userCompra.map(async (prod, i)=>{
              await Product_values.decrement(
                'stock', 
                {by:description[i].quantity,
                where: {id:prod.product_values[0].id}})
            }) 
          }else{
            userCompra =await Product.findByPk(description[0].id, {include:[{
                model: Product_values,
                where:{size:description[0].size},
                attributes: ["id"],
                through: { attributes: [] } 
              }]})

            await Product_values.decrement(
              'stock',
              {by:description[0].quantity,
                where: {id:userCompra.product_values[0].id}
              })
            //console.log(userCompra)
            let aux = []
            aux.push(userCompra)
            userCompra = aux
            
          }
          
          let productosComprados = []
          for (let i=0; i<userCompra.length; i++){
            if(i===0) 
              productosComprados.push(userCompra[i])
            else if(userCompra[i].id!==userCompra[i-1].id)
              productosComprados.push(userCompra[i])
          }

          await newSellOrder.addProducts(productosComprados)
          
          await userComprador.addSell_order(newSellOrder)
        
          
        mailPayment(userComprador.dataValues.email, id, mensaje="Pago exitoso");
        return res.status(200).send({
          clientSecret: payment.client_secret,
        });
      }}     
      else return res.json({ message: "hubo un error"})
      
      //return res.status(200).json({ message: "Successful Payment" });
      
    } catch (error) {
      console.log(error);
      return res.json({ message: "hubo un error"/* error.raw.message */ });
    } 
  }); 

module.exports = router;
