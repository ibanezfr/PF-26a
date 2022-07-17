const { Ticket,Fase } = require("../db");
const { Router } = require("express");


const router = Router();
router.get("/", async (req, res) => {
    try {
      const allTickets = await Ticket.findAll({
        include: [
          {
            model: Fase,
            attributes: ["name"],
            through: { attributes: [] },
          }
        ],
      });
      
      res.status(200).send(allTickets);
    } catch (err) {
      res.status(400).send({ msg: err.message });
    }
  });
module.exports = router;