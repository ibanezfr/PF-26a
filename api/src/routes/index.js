const router = require("express").Router();
const products = require("./products.js");
const categories = require('./categories');

router.use("/products", products);
router.use("/categories", categories);

module.exports = router;