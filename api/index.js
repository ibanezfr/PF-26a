const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { getProducts } = require("./src/middlewares/middlewares");


conn.sync({ force:true }).then(() => {
   server.listen(3001, async () => {
     await getProducts();     
     console.log("%s listening at 3001"); 
   });
 });


//Cambio de Nicole


/*
{
   equipo: {
      nombre:
      ligas:
      partidos: {
         {
            contrincante: 
            condición:
            puntosTotales:
            }
         }
      }
   }
}


El estado inicial de puntos para cada jugador sería 0, entonces se hace un onClick={e=>handleOnClick(e)}

handleOnClick(e){
   e.preventDefault
   partido.puntosTotales: puntos + 1
}

handleOnClickDobles(e){
   e.preventDefault
   partido.puntosTotales: puntos + 2
}

DE ESTA FORMA CADA VEZ QUE DOY CLICK EN EL BOTÓN DE PUNTOS DEL JUGADOR SE SUMA 1 PUNTO PARA ÉL O ELLA.

LA RELACIÓN DE LA TABLA INTERMEDIA ENTRE CLUB/JUGADOR SERÍA UN JUGADOR PUEDE PERTENECER A UN CLUB PERO UN CLUB PUEDE TENER MUCHOS JUGADORES.

LA RELACION DE LA TABLA INTERMEDIA ENTRE PARTIDO/JUGADOR SERIA DE MUCHOS A MUCHOS

LA RELACION DE LA TABLE INTERMEDIA ENTRE PARTIDO/CLUB SERIA TAMBIEN DE MUCHOS A MUCHOS

REGLAS BÁSICAS DEL BASQUET:

-Los tiros libres valen 1 punto
-Los tiros simples valen 2 puntos
-Los tiros por fuera del "área" valen 3 puntos
-Sólo se pueden hacer 5 faltas por jugador
-Se suelen contabilizar los rebotes de cada jugador
*/
