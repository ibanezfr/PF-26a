const { Product, Cart } = require("../db");
const { Router } = require("express");
const { Op } = require("sequelize");

const router = Router();

//MW para encontrar un producto según su ID

let cart = [];
router.get("/:id", async( req, res)=>{
    const {id} = req.params;

    const filtered = await Product.findByPk(id);

    // console.log("cart antes del push:", cart)
    // console.log("filtered", filtered)

    if(filtered){

        // let isOnCart = cart.includes(filtered);
        var pos = -1;
        for(let i=0; i<cart.length; i++){
            if(cart[i].id === id){
                pos = i;
                // console.log("pos adentro del if: ", pos)
            }
            // console.log("pos adentro del for pero afuera del if :,)", pos)

        }
        // console.log("pos: ", pos)
        // var pos=-1;
        // console.log("isOnCart", isOnCart)
        if(pos === -1){
            let data = {
                name: filtered.name,
                id: filtered.id,
                price: filtered.price,
                amount : 1
            }
            // console.log("data: ", data)
            cart.push(data);
            // pos=0;
        }

        if(pos !== -1){
            //acá tendría que agg uno mas
            //tendrias que entrar en cart.amount de ese producto y sumarle 1
            cart[pos].amount = cart[pos].amount + 1; 
            // console.log("amount en el if: ", cart[pos].amount)
        }

        console.log("cart despues del push: ", cart)
        return res.send(cart);

    } else {
        console.log("error, no se ha encontrado el producto")
    }
}, cart);

// router.get("/:id", async( req, res)=>{
//     const {id} = req.params;
//     const cartRoute = await addProductByPk(id);
//     res.send(cartRoute)

// })

module.exports = router;