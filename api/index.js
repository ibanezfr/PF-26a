const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { getProducts } = require("./src/middlewares/middlewares");


conn.sync({ force:true }).then(() => {
   server.listen(3001, async () => {
     await getProducts();     
     console.log("%s listening at 3001"); 
   });
 });

