const router = require("express").Router();
const products = require("./products.js");
const categories = require("./categories");
const functionalities = require('./functionalities');
const usersHandlers = require('./users.js')

router.use("/products", products);
router.use("/categories", categories);
router.use("/function", functionalities);
router.use("/users", usersHandlers);

module.exports = router;
