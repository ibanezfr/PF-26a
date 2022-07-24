const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { getProducts } = require("./src/middlewares/middlewares");

conn.sync({ force: false }).then(() => {
  server.listen(3001, async () => {
    await getProducts();
    console.log("%s listening at 3001");
  });
});
