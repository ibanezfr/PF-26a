require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
// const Match = require('./models/Match');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`,
        { logging: false, native: false, timestamps: false }
      );

// const {
//     DB_USER, DB_PASSWORD, DB_HOST,
// } = process.env;

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`, {
//     logging: false,
//     native: false,
//     timestamps: false
// });
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Product, Category, Qa, User, Review, Product_values, Sell_order } =
  sequelize.models;

Product_values.belongsToMany(Product, { through: "productValue-categories" });
Product.belongsToMany(Product_values, { through: "productValue-categories" });

Category.belongsToMany(Product, { through: "product-categories" });
Product.belongsToMany(Category, { through: "product-categories" });

Product.belongsToMany(Qa, { through: "product-QA" });
Qa.belongsToMany(Product, { through: "product-QA" });

Product.belongsToMany(User, { through: "favorite-product" });
User.belongsToMany(Product, { through: "favorite-product" });

User.belongsToMany(Qa, { through: "user-qa" });
Qa.belongsToMany(User, { through: "user-qa" });

Product.belongsToMany(Review, { through: "product-reviews" });
Review.belongsTo(Product);

User.belongsToMany(Review, { through: "user-reviews" });
Review.belongsTo(User);

User.hasMany(Sell_order); //1 user tiene muchas sell orders
Sell_order.belongsTo(User); //sell order pertenece a 1 user

Product.belongsToMany(Sell_order, { through: "product-orders" });
Sell_order.belongsToMany(Product, { through: "product-orders" });

Sell_order.belongsToMany(Product_values, { through: "produtcValues-orders" });
Product_values.belongsToMany(Sell_order, { through: "produtcValues-orders" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
