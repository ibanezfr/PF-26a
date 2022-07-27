<<<<<<< HEAD
//Cambio de Nicole
function visual() {
  console.log("hola mundo");
}

console.log("soy ulises");
console.log("soy ulises");
visual();
=======
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { getProducts } = require("./src/middlewares/middlewares");

conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    await getProducts();
    console.log("%s listening at 3001");
  });
});
>>>>>>> 8d95716b4ac8f7b3f62ee3ae779a5fc4f9579ed5
