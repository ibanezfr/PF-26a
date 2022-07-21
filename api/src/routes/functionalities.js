const { Product,Category,Review ,Qa} = require("../db");
const { Router } = require("express");
const { Op } = require("sequelize");


const router = Router();

//Llamo a las categorías para renderizarlas más facilmente en el front
//Devuelvo ["cat1", "cat2"...etcetc]
router.get('/categories/:id', async(req, res, next)=>{
    try{
        const {id} = req.params;
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
          ],
        });
        if (id) {
            const filtered = await allProducts.filter((e) => e.id == id);
            const maped = filtered.map(f=>f.categories)
            const maped2 = maped[0].map(m=>m.name)

            // console.log("categorias: ", maped2)
          
            res.json(maped2);
          }
    }
    catch(error){
        next(error);
    }
  });

  //Ruta de put para modificar el stock al sumar/eliminar/comprar productos desde el carrito de compras

  router.put("/stock/:id", async(req, res, next)=>{
    const { id } = req.params;
    const { stock } = req.body;

    try {
        const newProduct = await Product.update({
          stock
        }, {where: {id:id}});

        return res.status(200).send({msg: "Producto actualizado"});
    } catch (error) {
      return res.status(400).send({msg: error.message});    
    }
  })


module.exports = router;