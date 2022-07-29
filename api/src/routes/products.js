const { Product, Category, Review, Qa, Product_values } = require("../db");
const { Router } = require("express");
const { Op } = require("sequelize");


const router = Router();

router.get("/", async (req, res) => {
  try {

    const allProducts = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Qa,
          attributes: ["title", "description", "answer", "resolved"],
          through: { attributes: [] },
        },
        {
          model: Review,
          attributes: ["rating", "title", "description"],
          through: { attributes: [] },
        },
        {
          model: Product_values,
          attributes: ["size", "stock"],
          through: { attributes: [] },
        }
      ],
    });

    res.status(200).send(allProducts);

  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});


//GET SIZE AND STOCK BY ID:
router.get('/size/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const allProducts = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Qa,
          attributes: ["title", "description", "answer", "resolved"],
          through: { attributes: [] },
        },
        {
          model: Review,
          attributes: ["rating", "title", "description"],
          through: { attributes: [] },
        },
        {
          model: Product_values,
          attributes: ["size", "stock"],
          through: { attributes: [] },
        }
      ],
    });
    if (id) {
      const filtered = await allProducts.filter((e) => e.id == id);

      const sizeMaped = filtered[0].product_values.map(m => m.size)
      const stockMaped = filtered[0].product_values.map(p=> p.stock)
      // console.log("Size: ", sizeMaped)
      // console.log("Stock: ", stockMaped)

      var array = [];

      for (let i=0; i<sizeMaped.length; i++){
        array.push(sizeMaped[i])
        array.push(stockMaped[i])
      }

      console.log("array: ", array);
      // const maped2 = maped[0]
      // const split = maped2.split(/\s*,\s*/)

      res.json(array);
    }
  }
  catch (error) {
    next(error);
  }
});

//PUT SIZE AND STOCK BY ID:
// router.put('/size/:id', async(req, res, next) =>{
//   try {
//     const { id } = req.params;
//     const allProducts = await Product.findAll({
//       include: [
//         {
//           model: Category,
//           attributes: ["name"],
//           through: { attributes: [] },
//         },
//         {
//           model: Qa,
//           attributes: ["title", "description", "answer", "resolved"],
//           through: { attributes: [] },
//         },
//         {
//           model: Review,
//           attributes: ["rating", "title", "description"],
//           through: { attributes: [] },
//         },
//         {
//           model: Product_values,
//           attributes: ["size", "stock"],
//           through: { attributes: [] },
//         }
//       ],
//     });
//     if (id) {
//       const filtered = await allProducts.filter((e) => e.id == id);

//       const sizeMaped = filtered[0].product_values.map(m => m.size)
//       const stockMaped = filtered[0].product_values.map(p=> p.stock)

//       var array = [];

//       for (let i=0; i<sizeMaped.length; i++){
//         array.push(sizeMaped[i])
//         array.push(stockMaped[i])
//       }

//       console.log("array: ", array);

//       res.json(array);
//     }
//   }
//   catch (error) {
//     next(error);
//   }
// })

router.get("/search", async (req, res) => {
  const { name } = req.query;
  try {
    const searchProducts = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Qa,
          attributes: ["title", "description", "answer", "resolved"],
          through: { attributes: [] },
        },
        {
          model: Review,
          attributes: ["rating", "title", "description"],
          through: { attributes: [] },
        },
        {
          model: Product_values,
          attributes: ["size", "stock"],
          through: { attributes: [] },
        }

      ],
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });

    res.status(200).send(searchProducts);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

router.post("/create", async (req, res) => {
  const {
    name,
    price,
    description,
    color,
    rating,
    image,
    image2,
    image3,
    image4,
    categories,
    product_values} = req.body;

  try {
    const newProduct = await Product.create({
      name: name.toUpperCase(),
      price,
      description,
      color,
      rating,
      image,
      image2,
      image3,
      image4,
      created: true
    });

    const mappedStock = product_values.map(m => m.stock)
    const mappedSize = product_values.map(m => m.size)

    var obj = [];

    for(i=0; i<mappedStock.length; i++){
      obj = await Product_values.create({
        stock: mappedStock[i],
        size: mappedSize[i]
      });

      // console.log("obj en el for: ", obj)
      await newProduct.addProduct_values(obj)
    }

    // const newStock = await Product_values.create({
    //   stock,
    //   size
    // })

    // if(newStock){
    //   await newProduct.addProduct_values(newStock)
    // }

    for (let i = 0; i < categories.length; i++) {
      let cat = await Category.findOne({
        where: { name: { [Op.iLike]: `%${categories[i].name}%` } },
      });

      if (cat) {
        await newProduct.addCategory(cat);
      }
    }

    return res.status(201).send({ msg: "Producto Creado", producto: newProduct });
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const allProducts = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Qa,
          attributes: ["title", "description", "answer", "resolved"],
          through: { attributes: [] },
        },
        {
          model: Review,
          attributes: ["rating", "title", "description"],
          through: { attributes: [] },
        },
        {
          model: Product_values,
          attributes: ["size", "stock"],
          through: { attributes: [] },
        }
      ],
    });
    // if (id) {
    //   const filtered = await allProducts.filter((e) => e.id == id);
    // }
    res.json(allProducts);
  }
  catch (error) {
    next(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.destroy({ where: { id: id } });
    return res.status(200).send({ msg: "Producto eliminado" })
  } catch (error) {
    return res.status(400).send({ msg: error.message })
  }
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description, color, rating, image, image2, image3, image4, stock, size, categories } = req.body;
  try {
    const newProduct = await Product.update({
      name: name.toUpperCase(),
      price,
      description,
      color,
      rating,
      image,
      image2,
      image3,
      image4,
      stock,
      created: true,
      size
    }, { where: { id: id } });

    if (categories) {
      const productUpdate = await Product.findOne({ where: { id: id } })
      for (let i = 0; i < categories.length; i++) {
        let cat = await Category.findOne({
          where: { name: { [Op.iLike]: `%${categories[i].name}%` } },
        });

        if (cat) {
          await productUpdate.addCategory(cat);
        }
      }
    };

    return res.status(200).send({ msg: "Producto actualizado" });
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
})

module.exports = router;
