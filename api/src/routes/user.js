const { Router } = require("express");

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

//AGUS
//rutas para levantar las compras hechas
//por los usuarios
/*
const allOrders = await Sell_order.findAll({include: Product})
const user_orders= await User.findByPk(user, {include: Sell_order})
*/
router.get('/compras/:id'){
  
}

router()
module.exports = router;
