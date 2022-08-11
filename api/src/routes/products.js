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
          through: {
            attributes: [],
          },
        },
        {
          model: Qa,
          attributes: ["title", "description", "answer", "resolved"],
          through: {
            attributes: [],
          },
        },
        {
          model: Review,
          attributes: ["rating", "title", "description"],
          through: {
            attributes: [],
          },
        },
        {
          model: Product_values,
          attributes: ["size", "stock"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.status(200).send(allProducts);
  } catch (err) {
    res.status(400).send({
      msg: err.message,
    });
  }
});

//GET SIZE AND STOCK BY ID:
router.get("/size/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: [
        {
          model: Product_values,
          attributes: ["size", "stock"],
          through: { attributes: [] },
        },
      ],
    });

    const sizeMaped = product.product_values.map((m) => m.size);
    const stockMaped = product.product_values.map((p) => p.stock);
    // console.log("Size: ", sizeMaped)
    // console.log("Stock: ", stockMaped)

    var size_Stock = [];

    for (let i = 0; i < sizeMaped.length; i++) {
      size_Stock.push(sizeMaped[i]);
      size_Stock.push(stockMaped[i]);
    }
    //console.log("array: ", size_Stock);

    return res.status(200).send(size_Stock);
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
});

router.get("/search", async (req, res) => {
  const { name } = req.query;
  try {
    const searchProducts = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Qa,
          attributes: ["title", "description", "answer", "resolved"],
          through: {
            attributes: [],
          },
        },
        {
          model: Review,
          attributes: ["rating", "title", "description"],
          through: {
            attributes: [],
          },
        },
        {
          model: Product_values,
          attributes: ["size", "stock"],
          through: {
            attributes: [],
          },
        },
      ],
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });

    res.status(200).send(searchProducts);
  } catch (err) {
    res.status(400).send({
      msg: err.message,
    });
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
    product_values,
  } = req.body;

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
      created: true,
    });

    const mappedStock = product_values.map((m) => m.stock);
    const mappedSize = product_values.map((m) => m.size);

    var obj = [];

    for (i = 0; i < mappedStock.length; i++) {
      obj = await Product_values.create({
        stock: mappedStock[i],
        size: mappedSize[i],
      });

      await newProduct.addProduct_values(obj);
    }

    for (let i = 0; i < categories.length; i++) {
      let cat = await Category.findOne({
        where: {
          name: {
            [Op.iLike]: `%${categories[i].name}%`,
          },
        },
      });
      console.log(cat);
      if (cat) {
        await newProduct.addCategory(cat);
      }
    }

    return res.status(201).send({
      msg: "Producto Creado",
      producto: newProduct,
    });
  } catch (error) {
    return res.status(400).send({
      msg: error.message,
    });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const allProducts = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Qa,
          attributes: ["title", "description", "answer", "resolved"],
          through: {
            attributes: [],
          },
        },
        {
          model: Review,
          attributes: ["rating", "title", "description"],
          through: {
            attributes: [],
          },
        },
        {
          model: Product_values,
          attributes: ["size", "stock"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.json(allProducts);
  } catch (error) {
    next(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).send({
      msg: "Producto eliminado",
    });
  } catch (error) {
    return res.status(400).send({
      msg: error.message,
    });
  }
});

//----------------------------------------------RUTA PARA OCULTAR EL PRODUCTO-----------------------------
router.put("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (product.status === "active") {
      const newState = Product.update({
        status: "inactive",
      });
      return res.status(200).send({
        msg: "Producto deshabilitado"
      })
    } else {
      const newState = Product.update({
        status: "active",
      });
      return res.status(200).send({
        msg: "Producto habilitado",
      });
    }
  } catch (error) {
    return res.status(400).send({
      msg: error.message,
    });
  }
});

router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
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
    product_values,
    categories,
    status,
  } = req.body;
  console.log(product_values);
  try {
    const findProd = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ["name", "id"],
          through: {
            attributes: [],
          },
        },
        {
          model: Product_values,
          attributes: ["size", "stock", "id"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    findProd.categories.map(async (e) => {
      await findProd.removeCategory(e.id);
    });
    console.log(findProd.product_values);
    findProd.product_values.map(async (e) => {
      await Product_values.destroy({ where: { id: e.id } });
    });
    // for (let i = 0; i < findProd.product_values.length; i++) {
    //   let idProd = findProd.product_values[i].id;
    //   await Product_values.update(
    //     {
    //       stock: stock,
    //       size: size,
    //     },
    //     {
    //       where: { id: idProd },
    //     }
    //   );
    // }

    const newProduct = await Product.update(
      {
        name: name?.toUpperCase(),
        price,
        description,
        color,
        rating,
        image,
        image2,
        image3,
        image4,
        created: true,
        status,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (product_values) {
      console.log("VALUES");
      for (let i = 0; i < product_values.length; i++) {
        let pval = await Product_values.create({
          size: product_values[i].size,
          stock: product_values[i].stock,
        });

        await findProd.addProduct_values(pval);
      }
    }

    if (categories) {
      console.log("ENTRO");
      for (let i = 0; i < categories.length; i++) {
        let cat = await Category.findOne({
          where: {
            name: {
              [Op.iLike]: `%${categories[i]}%`,
            },
          },
        });
        if (cat) {
          console.log("ENTRO222222222");
          await findProd.addCategory(cat);
        }
      }
    }

    return res.status(200).send("prod");
  } catch (error) {
    return res.status(500).send(error);
  }
});

// ------- Rutas para las Q&A -------------

router.get("/q&a/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id, {
    include: [
      {
        model: Category,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Qa,
        attributes: ["title", "description", "answer", "resolved"],
        through: {
          attributes: [],
        },
      },
      {
        model: Review,
        attributes: ["rating", "title", "description"],
        through: {
          attributes: [],
        },
      },
      {
        model: Product_values,
        attributes: ["size", "stock"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  const titleMaped = product.qas.map((m) => m.title);
  const descriptionMaped = product.qas.map((p) => p.description);
  // console.log("Size: ", sizeMaped)
  // console.log("Stock: ", stockMaped)

  var array = [];

  for (let i = 0; i < titleMaped.length; i++) {
    array.push(titleMaped[i]);
    array.push(descriptionMaped[i]);
  }

  res.send(array);
  // const qas = product.qas;
  // console.log("qas", qas)
});

//GET para el id de las preguntas y respuestas
router.get("/answer/id", async (req, res) => {
  try {
    const questions = await Qa.findAll();
    res.send(questions);
  } catch (err) {
    console.log(err);
  }
});
//GET para las respuestas
router.get("/answer/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id, {
    include: [
      {
        model: Category,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Qa,
        attributes: ["id", "title", "description", "answer", "resolved"],
        through: {
          attributes: [],
        },
      },
      {
        model: Review,
        attributes: ["rating", "title", "description"],
        through: {
          attributes: [],
        },
      },
      {
        model: Product_values,
        attributes: ["size", "stock"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  const answerMaped = product.qas.map((m) => m.answer);
  // console.log("Size: ", sizeMaped)
  // console.log("Stock: ", stockMaped)

  var array = [];

  for (let i = 0; i < answerMaped.length; i++) {
    array.push(answerMaped[i]);
    array.push("");
  }

  res.send(array);
  // const qas = product.qas;
  // console.log("qas", qas)
});

router.post("/q&a/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const { idUser } = req.body;
  const { title, description, answer, resolved } = req.body;

  console.log("id:", idProduct);

  try {
    const newQuestion = await Qa.create({
      title,
      description,
      answer,
      resolved,
    });
    const productUpdate = await Product.findOne({
      where: {
        id: idProduct
      }
    })
    if (newQuestion) {
      await productUpdate.addQa(newQuestion);
    }

    res.send(productUpdate)
  } catch (err) {
    console.log(err);
  }
})

//------------------------------------RUTAS PARA REVEWS---------------------------------
router.get("/review/:idReview", async (req, res) => {
  const {
    idReview
  } = req.params;
  try {
    const review = await Review.findOne({
      where: {
        id: idReview
      }
    })

    res.send(review)
  } catch (err) {
    console.log(err)
  }
})

router.post("/review/:idProduct", async (req, res, next) => {
  const {
    idProduct
  } = req.params;
  const {
    rating,
    title,
    description
  } = req.body;
  try {
    const product = await Product.findOne({
      where: { id: idProduct },
      include: {
          model: Review,
          attributes: ["rating", "title","description"],
          through: { attributes: [] }
      }
  })

    const review = await Review.create({
      rating,
      title,
      description
    })
    if (product) {
      await review.setProduct(product)
    }

    product.addReview(review)
  
  res.status(200).send({msg: "ok"})

  } catch (err) {
    console.log(err)
  }
})

router.get("/reviews/:idProduct", async (req, res) => {
  const { idProduct} = req.params;
   try{
    const product = await Product.findByPk(idProduct, {
      include: [
        
       
        {
          model: Review,
          attributes: ["rating", "title", "description"],
          through: {
            attributes: [],
          },
        }
      ],
    });
  
    
  
    res.send(product);
   }catch (err) {
    console.log(err)
  }
});

module.exports = router;
