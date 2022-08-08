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
                    attributes: [ "id", "name", "image", "price", "description" ],
                    through: { attributes: [] }
                }
            ]
        });
        return res.status(200).send(favsUser);
    } catch (error) {
        return res.status(400).send({ msg: error.message });
    }
});

router.post("/add", async (req, res) => {
    const { userID, productID } = req.body;
    // const { name, image, price } = req.body;
    try {
        const favsUser = await User.findByPk(userID);
        await favsUser.addProduct(productID);
        const userFavs = await User.findByPk(userID, {
            include: [
                {
                    model: Product,
                    attributes: [ "id", "name", "image", "price", "description" ],
                    through: { attributes: [] }
                }                
            ]
        })
        return res.status(200).send({ msg: "Producto añadido a Favoritos", res: userFavs});        
    } catch (error) {
        return res.status(400).send({ msg: error.message });
    }
});

router.delete("/remove/:userID/:productID", async (req, res) => {
    const { userID, productID } = req.params;
    try {
        const favsUser = await User.findByPk(userID);

        await favsUser.removeProduct(productID);
        return res.status(200).send({msg: "Producto eliminado de Favoritos"});

    } catch (error) {
        return res.status(400).send({ msg: error.message });
    }
});

module.exports = router;
