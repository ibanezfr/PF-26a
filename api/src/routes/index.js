const router = require("express").Router();
const products = require("./products.js");
const categories = require("./categories");
const functionalities = require('./functionalities');
const usersHandlers = require('./users.js')
const pay= require("./pay")
const admin= require("./admin")
const favorites = require("./favorites")


router.use("/products", products);
router.use("/categories", categories);
router.use("/pay", pay)
router.use("/admin", admin)
router.use("/favs", favorites);

// Usuarios ->
const user = require("./user.js");
router.use("/auth", user);

// Admin ->
const {
  getAllUsers,
  setAdmin,
  disableAccount, 
  updateStatus,
} = require("../controllers/admin.js");
router.get("/admin/users", getAllUsers);
router.put("/admin/:id", setAdmin);
router.put("/admin/ban/:id", disableAccount);
router.put("/admin/status/:id", updateStatus);

router.use("/function", functionalities);
router.use("/users", usersHandlers);
 
module.exports = router;
