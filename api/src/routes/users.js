const { User, Product, Category, Review, Qa } = require("../db");
const { Router } = require("express");
const { Op } = require("sequelize");

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const allUsers = await User.findAll();
        res.status(200).send(allUsers);
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})

router.get('/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        const user = User.findByPk(id)
            .then(results => res.send(results))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

router.get('/favorites/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        const user = User.findByPk(id, {
            include: [{
                model: Product,
                attributes: ["id"]
            }]
        })
            .then(results => res.send(results.products))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

router.post('/', (req, res, next) => {
    const { name, lastname, email, country, province, city, street, banned, isAdmin, created } = req.body;
    try {
        const newUser = User.create({
            name,
            lastname,
            email,
            country,
            province,
            city,
            street,
            banned,
            isAdmin,
            created,
        })

        return res.status(201).send({ msg: "Usuario creado correctamente" });

    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})

router.post('/:userId/product/:productId', (req, res, next) => {
    const { userId, productId } = req.params;
    try {
        User.findByPk(userId)
            .then(user => {
                return user.addProduct(productId)
            }).then(() => res.send(200))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

// router.delete('/:userId/product/:productId', (req, res, next) => {
//     const { userId, productId } = req.params;
//     try {
//         User.findByPk(userId)
//             .then(user => {
//                 return user.removeProduct()
//     } catch (error) {
//         next(error)
//     }
// })

module.exports = router;
