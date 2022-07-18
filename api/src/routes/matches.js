const { Match, Statistics } = require("../db");
const { Router } = require("express");


const router = Router();
router.get("/", async (req, res) => {
    try {
      const allMatches = await Match.findAll({
        include: [
          {
            model: Statistics,
            attributes: ["score"],
            through: { attributes: [] },
          }
        ],
      });
      
      res.status(200).send(allMatches);
    } catch (err) {
      res.status(400).send({ msg: err.message });
    }
  });

module.exports = router;