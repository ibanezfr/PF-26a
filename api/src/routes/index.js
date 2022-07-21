const router = require("express").Router();
const products = require("./products.js");
const categories = require("./categories");
const functionalities = require('./functionalities');


router.use("/products", products);
router.use("/categories", categories);
router.use("/function", functionalities);


module.exports = router;