const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { getProducts } = require("./src/middlewares/middlewares");
//en true cada vez que hace cambios es en back se vuelve a crear
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    await getProducts();
    console.log("%s listening at 3001");
  });
});
