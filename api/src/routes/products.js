const { Product,Category,Review ,Qa, Image} = require("../db");
const { Router } = require("express");


const router = Router();
router.get("/", async (req, res) => {
  try {
    const allProducts = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Qa,
          attributes: ["title","description", "answer", "resolved"],
          through: { attributes: [] },
        },
        {
          model: Review,
          attributes: ["rating", "title", "description"],
          through: { attributes: [] },
        },
        // {
        //   model: Image,
        //   attributes: ["src"],
        //   through: { attributes: [] },
        // },
      ],
    });
    res.status(200).send(allProducts);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});
module.exports = router;