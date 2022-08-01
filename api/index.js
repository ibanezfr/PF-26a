const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { getProducts } = require("./src/middlewares/middlewares");
//en true cada vez que hace cambios es en back se vuelve a crear
//con alter:true actualiza las tablas con los cambios que hago en models
// conn.sync({ force:false }).then(() => {
//   server.listen(3001, async () => {
//     await getProducts();
//     console.log("%s listening at 3001");
//   });
// }); 

conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    await getProducts();
    console.log("%s listening at 3000"); // eslint-disable-line no-console
  });
});