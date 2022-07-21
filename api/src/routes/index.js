const router = require("express").Router();
const products = require("./products.js");
const categories = require("./categories");
const functionalities = require("./functionalities");

router.use("/products", products);
router.use("/categories", categories);

// Users controller ->
const {
  register,
  login,
  getUser,
  updateUser,
} = require("../controllers/user.js");
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/:id", getUser);
router.put("/auth/:id", updateUser);

//

router.use("/function", functionalities);

module.exports = router;
