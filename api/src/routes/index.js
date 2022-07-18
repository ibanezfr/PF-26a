const router = require("express").Router();
const ticketBasket = require("./ticketBasket");


router.use("/tickets", ticketBasket);


module.exports = router;