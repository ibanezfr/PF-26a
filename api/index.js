const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { getProducts } = require("./src/middlewares/middlewares");
//en true cada vez que hace cambios es en back se vuelve a crear
//con alter:true actualiza las tablas con los cambios que hago en models

conn.sync({ force: false}).then(() => {
  server.listen(process.env.PORT, async() => {
    await getProducts();
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
 