const { Router } = require("express");
const { Product, User } = require("../db");

const router = Router();

router.get("/users", async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).send(users);        
    } catch (error) {
        return res.status(400).send({ msg: error.message });        
    }
}); //ruta de prueba(despues se borra) Mica

router.get("/:userID", async (req, res) => {
    const { userID } = req.params;
    try {
        const favsUser = await User.findByPk(userID, {
            include: [
                {
                    model: Product,
                    attributes: [ "name", "image", "price" ],
                    through: { attributes: [] }
                }
            ]
        });
        return res.status(200).send(favsUser);
    } catch (error) {
        return res.status(400).send({ msg: error.message });
    }
});

router.put("/add/:userID/:productID", async (req, res) => {
    const { userID, productID } = req.params;
    // const { name, image, price } = req.body;
    try {
        const favsUser = await User.findByPk(userID);
        await favsUser.addProduct(productID);
        return res.status(200).send({ msg: "Producto añadido a Favoritos"});        
    } catch (error) {
        return res.status(400).send({ msg: error.message });
    }
});

module.exports = router;
