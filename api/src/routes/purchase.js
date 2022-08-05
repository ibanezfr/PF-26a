const { Sell_order, Product, User } = require("../db");
const { Router } = require("express");
const { Op } = require("sequelize");

const router = Router();

router.put('/purchaseState/:idOrder', async (req, res) => {
    let {
      idOrder
    } = req.params;
    //console.log(user)
  
    const order = await Sell_order.findOne({
      where: {
        id: idOrder
      }
    })

    console.log("orderStatus: ", order.orderStatus)
  
    if (order.orderStatus === 'pending') {
      const newOrder = Sell_order.update({
        order.orderStatus: 'accepted'
      })
  
  
      return res.status(200).send(order)
}
  
    // const newOrder = await Sell_order.update({
    //   orderStatus: "accepted"
    // })
  
  })


  module.exports = router;