const router = require("express").Router();
<<<<<<< HEAD
const ticketBasket = require("./ticketBasket");
const matches = require("./matches")


router.use("/tickets", ticketBasket);
router.use("/matches", matches);
=======
const products = require("./products.js");


router.use("/products", products);
>>>>>>> c4cb56703732b3ddc2d784dd5c7de8775ac0f757


module.exports = router;