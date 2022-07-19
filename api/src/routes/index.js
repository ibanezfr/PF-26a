const router = require("express").Router();
const products = require("./products.js");


router.use("/products", products);


module.exports = router;