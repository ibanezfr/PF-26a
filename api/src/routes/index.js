const router = require("express").Router();
const products = require("./products.js");
const categories = require("./categories");
const functionalities = require("./functionalities");
const user = require("./user.js");

router.use("/products", products);
router.use("/categories", categories);

// Usuarios ->
router.use("/auth", user);

router.use("/function", functionalities);

module.exports = router;
