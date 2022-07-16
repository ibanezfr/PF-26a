const { Tickets } = require("../db");
const { Router } = require("express");


const router = Router();
router.get("/", async (req, res) => {
    try {
      const allTickets = await Tickets.findAll({
        
      });
      res.status(200).send("Estos son los tickets de basket");
    } catch (err) {
      res.status(400).send({ msg: err.message });
    }
  });
module.exports = router;