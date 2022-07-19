
const products = require("../../../Pruebas/products.json");
const { Op } = require("sequelize");
const { Product, Category, Review } = require("../db");


async function getProducts() {
  const findCreated = await Product.findAll({ where: { created: true } });
  let count = await Product.count();
  if (findCreated.length === count) {
    for (let i = 0; i < products.length; i++) {
      const newProduct = await Product.create({
        name: products[i].name,
        price: products[i].price,
        description: products[i].description,
        rating: products[i].rating,
        image: products[i].image,
        image2: products[i].image2,
        image3: products[i].image3,
        image4: products[i].image4,
        stock: products[i].stock,
        status: products[i].status,
        size: products[i].size,
        color: products[i].color,
        db: true,
      });
    
      for (let j = 0; j < products[i].categories.length; j++) {
        let cat = await Category.findOne({
          where: { name: { [Op.iLike]: `%${products[i].categories[j].name}%` } },
        });

        if (cat) {
          await newProduct.addCategory(cat);
        } if(!cat) {
          let created = await Category.create({
            name: products[i].categories[j].name,
          });
          await newProduct.addCategory(created);
        }


      }
    }
  } else return { msg: "Failed" };

  

  return { msg: "Ok" };
}

module.exports = {
  getProducts

}
