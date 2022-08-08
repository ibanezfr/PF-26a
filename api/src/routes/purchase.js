const { Sell_order } = require("../db");
const { Router } = require("express");

const router = Router();

//-----------------------------CON ESTA RUTA MODIFICO EL ESTADO DE LAS ORDENES DE PRENDIENTE A ACEPTADA----------------

router.put('/purchaseState/:idOrder', async (req, res) => {
  let {
    idOrder
  } = req.params;

  const order = await Sell_order.findOne({
    where: {
      id: idOrder
    }
  })

  console.log("orderStatus: ", order.orderStatus)

  if (order.orderStatus === 'pending') {
    await order.update({
      orderStatus: 'accepted'
    })

    console.log("order", order)
    // console.log("newOrder: ", newOrder)
    return res.status(200).send(order)
  }

})


module.exports = router;