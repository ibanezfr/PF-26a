const router = require("express").Router();
const products = require("./products.js");
const categories = require("./categories");
const functionalities = require('./functionalities');
const usersHandlers = require('./users.js')
const pay = require("./pay")
const favorites = require("./favorites")


router.use("/products", products);
router.use("/categories", categories);
router.use("/pay", pay);
router.use("/favs", favorites);

// Usuarios ->
const user = require("./user.js");
router.use("/auth", user);

router.use("/function", functionalities);
router.use("/users", usersHandlers);

module.exports = router;
