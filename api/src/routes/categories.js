const { Category} = require("../db");
const { Router } = require("express");

const router = Router();

router.get('/', async(req, res)=>{
    try{
        let categories = await Category.findAll({
            attributes: ["name"],
        })
        categories = categories.map(cat => cat.name)
        res.status(200).send(categories)
    }catch (err) {
    res.status(400).send({ msg: err.message });
  }
})

module.exports = router;