const router = require("express").Router();
const products = require("./products.js");
const categories = require("./categories");
const functionalities = require('./functionalities');
const pay= require("./pay")

router.use("/products", products);
router.use("/categories", categories);
router.use("/function", functionalities);
router.use("/pay", pay)

module.exports = router;