const { Router } = require("express");
const router = Router();
const {
    Qa,
  } = require("../db");

router.put("/answer/:questionId", async (req, res) => {
    const { questionId } = req.params
    const { answer} = req.body

    console.log(answer , questionId)
    if (!answer || answer.length < 1) {
      return res.status(404).send("Answer must not be empty")
    }
  
    try {
        await Qa.update({
        answer,
        resolved: true,
      }, {
         where: 
         { id: questionId } })
  
    
 
      // 
      return res.status(200).send("exito")
    }
    catch (err) {
      console.log(err)
      res.status(400).send(err)
    }
  })

  module.exports = router;
  