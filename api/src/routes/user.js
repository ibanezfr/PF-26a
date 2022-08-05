const {
  Router
} = require("express");
const {
  User,
  Sell_order,
  Product
} = require("../db");

const router = Router();
// Users controller ->
const {
  register,
  login,
  getUser,
  updateUser,
  checkAccount,
} = require("../controllers/user.js");
router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.get("/status/:id", checkAccount);

//

/* nro orden = id tiquet
productos = [nombre, cantidad]
amount

promedio
 */

//AGUS
//rutas para levantar datos de
//compras desde el front


router.get('/compras/all', async (req, res) => {
  let allOrders = await Sell_order.findAll({
    include: User
  })
  //console.log(allOrders)
  return res.send(allOrders)
})


router.put('/purchateState/:idOrder', async (req, res) => {
  let {
    idOrder
  } = req.params;
  //console.log(user)

  const order = await Sell_order.findOne({
    where: {
      id: idOrder
    }
  })

  if (order.orderStatus === 'pending') {
    const newOrder = Sell_order.update({
      orderStatus: 'accepted'
    })


    return res.status(200).send(newOrder)
  }

  // const newOrder = await Sell_order.update({
  //   orderStatus: "accepted"
  // })

})

router.put('/compras/:id', async (req, res) => {
  let user = req.params.id;
  user = await User.findByPk(user, {
    include: Sell_order
  })
  //console.log(user)

  user = user.dataValues.sell_orders.map(order => {
    return {
      id: order.id,
      product: order.product.split(','),
      amount: order.amount,
      orderStatus: order.orderStatus
    }
  })
  return res.send(user)
})




module.exports = router;