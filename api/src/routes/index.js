const router = require("express").Router();
const products = require("./products.js");
const categories = require("./categories");
const functionalities = require('./functionalities');
const cart = require('./cart')


router.use("/products", products);
router.use("/categories", categories);
router.use("/function", functionalities);
router.use("/cart", cart);


module.exports = router;