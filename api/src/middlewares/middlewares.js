const products = require("../../Pruebas/products.json");
const { Op } = require("sequelize");
const { Product, Category, Product_values } = require("../db");
const nodemailer = require("nodemailer");

 
async function getProducts() {
  const findCreated = await Product.findAll({ where: { created: true } });
  let count = await Product.count();
  if (findCreated.length === count) {
    for (let i = 0; i < products.length; i++) {
      const newProduct = await Product.create({
        name: products[i].name.toUpperCase(),
        price: products[i].price,
        description: products[i].description,
        rating: products[i].rating,
        image: products[i].image,
        image2: products[i].image2,
        image3: products[i].image3,
        image4: products[i].image4,
        status: products[i].status,
        color: products[i].color,
        db: true,
      });

      // const mappedStock = product_values.map(m => m.stock)
      // const mappedSize = product_values.map(m => m.size)

      var obj = [];

      for(j=0; j<products[i].product_values.length; j++){
        // const valueStock= products[i].product_values[j]
        // const mappedStock = valueStock.map(m => m.stock)
        // const mappedSize = valueStock.map(m => m.size)
        obj = await Product_values.create({
          stock: products[i].product_values[j].stock,
          size: products[i].product_values[j].size
        });
  
        // console.log("obj en el for: ", obj)
        await newProduct.addProduct_values(obj)
      }
      
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

async function mailPayment(recipient, id,mensaje, total) {
 
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GOOGLE_MAIL_APP,
      pass: process.env.GOOGLE_MAIL_APP_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  // send mail with defined transport object
  await transporter.sendMail({
    from: "kilt indumentaria kilt.indumentaria@gmail.com",
    to: recipient, // list of receivers
    subject: `Orden N°: -${id}- ✔`, // Subject line
    text: mensaje, // plain text body
    html: `<center>
            <img src=https://i.pinimg.com/originals/ea/46/bf/ea46bf588ce10e78a9eadf2007a82b6a.jpg height=400px/> 
            <div width=300px style="font-size: 2rem; background-color: #dfced5; height: 65rem; width: 83rem;"> 
              <br>
              <h3>Hola ${recipient} </h3> 
              <span> Procesamos correctamente tu pago </span> 
              <br>
              <h3>Tu compra</h3>
              <table>
                <tr>
                  <th style= "text-align: center">Nombre</th>
                  <th style= "text-align: center">Talle</th>
                  <th style= "text-align: center">Cantidad</th>
                  <th style= "text-align: center">Precio</th>
                  <th style= "text-align: center">Sub total</th>
                </tr>  
                ${mensaje}
              </table>
              <h2>$${total}</h2>
              <br>
              <label>Gracias, Equipo Kilt Indumentaria</label>
            </div>
          </center>`
  });
 
}

module.exports = {
  getProducts,
  mailPayment

}
