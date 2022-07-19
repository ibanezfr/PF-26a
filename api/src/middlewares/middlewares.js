
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
        stock: products[i].stock,
        status: products[i].status,
        size: products[i].size,
        color: products[i].color,
        db: true,
      });

    

      for (let j = 0; j < products[i].categories.length; j++) {
        let cat = await Category.findOne({
          where: { name: { [Op.iLike]: `%${products[i].categories[j]}%` } },
        });

        if (cat) {
          await newProduct.addCategory(cat);
        } else {
          let created = await Category.create({
            name: products[i].categories[j],
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
