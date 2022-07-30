const { Router } = require("express");
const { User, Sell_order, Product } = require("../db");

const router = Router();
// Users controller ->
const {
  register,
  login,
  getUser,
  updateUser,
} = require("../controllers/user.js");
router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUser);
router.put("/:id", updateUser);

//

/* nro orden = id tiquet
productos = [nombre, cantidad]
amount

promedio
 */

//AGUS
//rutas para levantar datos de
//compras desde el front


router.get('/compras/all', async (req, res)=>{
  let allOrders = await Sell_order.findAll({include: User})
  //console.log(allOrders)
  return res.send(allOrders)
})


router.get('/compras/:id',async (req,res)=>{
  let user = req.params.id;
  user = await User.findByPk(user, {include: Sell_order})
  //console.log(user)
  user = user.dataValues.sell_orders.map(order=>{
    return{
      id:order.id,
      product: order.product.split(','),
      amount: order.amount
    }
  })



  return res.send(user)
})




module.exports = router;
