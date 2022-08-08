const { Router } = require("express");
const router = Router();
const {
  Qa,
  Product

} = require("../db");

router.put("/answer/:questionId", async (req, res) => {
  const { questionId } = req.params
  const { answer, productId } = req.body

  console.log(answer, questionId)
  if (!answer || answer.length < 1) {
    return res.status(404).send("Answer must not be empty")
  }

  try {
    await Qa.update({
      answer,
      resolved: true,
    }, {
      where:
        { id: questionId }
    })
    // 
    return res.status(200).send("exito")
  }
  catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

router.get("/all/:resolved", async (req, res) => {
  const { resolved } = req.params;
  try {
    if (resolved === "true") {
      const allQuestions = await Qa.findAll({
        include: [
          {
            model: Product,
            attributes: ["id", "name", "image"],
            through: { attributes: [] },
          }
        ],
        where: { resolved: true }
      });
      return res.send(allQuestions);
    } else if (resolved === "false") {
      const unresolvedOnly = await Qa.findAll({
        where: { resolved: false },
        include: [
          {
            model: Product,
            attributes: ["id", "name", "image"],
            through: { attributes: [] },
          }
        ]
      });
      if (unresolvedOnly) return res.send(unresolvedOnly);
    }
    // const all = await Qa.findAll({
    //   include: [
    //     {
    //       model: Product,
    //       attributes: ["id", "name", "image"],
    //       through: { attributes: [] },
    //     },
    //     {
    //       model: User,
    //       attributes: ["id"],
    //       through: { attributes: [] },
    //     },
    //   ]
    // });
    // return res.send(all)
  } catch (error) {
    console.log(error.message)
    res.status(404).send({ message: error.message });
  }

});

module.exports = router;
