const { Category } = require("../db");
const { Router } = require("express");
const { Op } = require("sequelize");

const router = Router();

router.get("/", async (req, res) => {
    try {
        const cat = await Category.findAll(); //{atribute:['name']} y map para quedarme con los names--AGUS
        return res.status(200).send(cat);
    } catch (error) {
        return res.status(400).send({ msg: error.message });
    }
});

router.post("/", async (req, res) => {
    const { name } = req.body;
    const aux = await Category.findOne({ where: {name: {[Op.iLike]: name}} });
    if (aux) {
        return res.status(400).send({msg: "La categoria ya existe"});
    }
    try {
        await Category.create({ name: name });
        return res.status(201).send({msg: "Categoria creada"});
    } catch (error) {
        return res.status(400).send({ msg: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Category.destroy({ where: { id: id } });
        return res.status(200).send({ msg: "Categoria eliminada" })
    } catch (error) {
        return res.status(400).send({ msg: error.message });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        await Category.update({ name: name }, { where: { id: id } });
        return res.status(200).send({ msg: "Categoria modificada" })
    } catch (error) {
        return res.status(400).send({ msg: error.message });
    }
});

module.exports = router;
