const { Router } = require("express");
const Stripe = require("stripe");
const { User, Product, Sell_order, Product_values } = require("../db");
const { Sequelize } = require('sequelize');
const { Op } = require("sequelize");
const stripe = new Stripe("sk_test_51LDapSLLyNiW7nbRtu012BcZsbgDoQtaLp5ADJ5usnS2kbDlUdBTda2fD0HqxN6PbBDUeQKTXFLRdxVZtntborIf00EcE31nIZ");
const router = Router();
const { mailPayment } = require("../middlewares/middlewares.js");
//const Product_values = require("../models/Product_values");

//
function formatDescription(description ) {
  return description.map(p => 
    '<tr>' + 
      '<td style= "text-align: center">' +
        p.name + 
      '</td>' +
      '<td> </td>' +
      '<td style= "text-align: center">' +
        p.size +
      '</td>' +
      '<td> </td>' +
      '<td style= "text-align: center">' +
        p.quantity + 
      '</td>' +
      '<td> </td>' + 
      '<td style= "text-align: center">' +
        p.price + 
      '</td>' +
      '<td> </td>' +
      '<td> </td>' +
      '<td style= "text-align: center">' +
        p.price * p.quantity +
      '</td>' +
    '</tr>')
}


router.post("/api/checkout", async (req, res) => {
  // you can get more data to find in a database, and so on
  const { id, amount, description, user, shippingInfo } = req.body;
  console.log(description)
  try {
    const userComprador = await User.findByPk(user)//trae el user que compro, validar si no existe
    if (user) {
      const payment = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "USD",
        description: formatDescription(description).join(',\n'),
        payment_method: id,
        confirm: true, //confirm the payment at the same time
      });

      if (payment.status === 'succeeded') {
        const newSellOrder = await Sell_order.create({
          amount: amount * 100,
          product: formatDescription(description).join('\n'),//armar funcion 
          country: shippingInfo.country,
          province: shippingInfo.province,
          city: shippingInfo.city,
          postalCode: shippingInfo.postalCode
        })

        const userCompra = await Promise.all(description.map(async (p) => {
          return await Product.findByPk(p.id, {
            include: [{
              model: Product_values,
              where: { size: p.size },
              attributes: ["id"],
              through: { attributes: [] }
            }]
          })
        }))
        //res.send(userCompra)
        userCompra.map(async (prod, i) => {
          await Product_values.decrement(
            'stock',
            {
              by: description[i].quantity,
              where: { id: prod.product_values[0].id }
            })
          //console.log(prod.product_values[0].id)
        })

        let productosComprados = []
        for (let i = 0; i < userCompra.length; i++) {
          if (i === 0)
            productosComprados.push(userCompra[i])
          else if (userCompra[i].id !== userCompra[i - 1].id)
            productosComprados.push(userCompra[i])
        }

        await newSellOrder.addProducts(productosComprados)

        await userComprador.addSell_order(newSellOrder)
      }

      mailPayment(userComprador.dataValues.email, id, mensaje = formatDescription(description).join('\n'), total= amount);
    }
    else return res.json({ message: "hubo un error" })

    return res.status(200).json({ message: "Successful Payment" });
  } catch (error) {
    console.log(error);
    return res.json({ message: "hubo un error"/* error.raw.message */ });
  }
});

module.exports = router;
