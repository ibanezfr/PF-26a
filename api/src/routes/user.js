const { Router } = require("express");

const router = Router();
// Users controller ->
const {
  register,
  login,
  getUser,
  updateUser,
} = require("../controllers/user.js");
router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUser);
router.put("/:id", updateUser);

//

module.exports = router;
