const { User, Product, Category, Review, Qa } = require("../db");
const { Router } = require("express");
const { Op } = require("sequelize");

const router = Router();


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
