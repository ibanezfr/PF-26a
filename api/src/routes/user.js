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


router.get("/compras/all", async (req, res) => {
  let allOrders = await Sell_order.findAll({
    include: [
      {
        model: User
      },
      {
        model: Product,
        attributes: ["id", "image", "name"],
        through: {
          attributes: [],
        },
      }
    ]
  });
  //console.log(allOrders)
  return res.send(allOrders);
});

router.get("/singlePurchase/:id", async (req, res) => {
  const { id } = req.params;
  let allOrders = await Sell_order.findAll({
    include: [
      {
        model: User
      },
      {
        model: Product,
        attributes: ["id", "image", "name"],
        through: {
          attributes: [],
        },
      }
    ],
    where: {
      userId: id
    },
  });

  const order = allOrders.map((order) => {
    return {
      id: order.id,
      product: order.product.split(","),
      amount: order.amount,
      orderStatus: order.orderStatus,
      date: order.date,
      image: order.products.map(m => m.image)
    };
  });
  //console.log(allOrders)
  return res.send(order);
});
//--------------------------ME TRAIGO LA INFORMACIÓN DE LAS COMPRAS--------------------------------- 

router.put("/compras/:id", async (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.body;

  try {
    const order = await Sell_order.findOne({ where: { id: id } });
    if (order) {
      const result = await Sell_order.update(
        {
          orderStatus: orderStatus,
        },
        { where: { id: id } }
      );

      return res.status(200).send(result);
    }
    res.status(404).send("Not found");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/compras/:id", async (req, res) => {
  let user = req.params.id;
  user = await User.findByPk(user, { include: Sell_order });

  console.log(user.sell_orders)
  user = user.dataValues.sell_orders.map((order) => {
    return {
      id: order.id,
      product: order.product.split(","),
      amount: order.amount,
      orderStatus: order.orderStatus
    };
  });

  return res.send(user);
});

module.exports = router;