const router = require("express").Router();
const ticketBasket = require("./ticketBasket");
const matches = require("./matches")


router.use("/tickets", ticketBasket);
router.use("/matches", matches);


module.exports = router;