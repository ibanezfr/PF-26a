
const products = require("../../../Pruebas/products.json");
const { Op } = require("sequelize");
<<<<<<< HEAD
const { Ticket, Fase, Match, Statistics } = require("../db");
const matches = require("../../../Pruebas/matches.json")
=======
const { Product, Category, Review } = require("../db");
>>>>>>> c4cb56703732b3ddc2d784dd5c7de8775ac0f757


async function getProducts() {
  const findCreated = await Product.findAll({ where: { created: true } });
  let count = await Product.count();
  if (findCreated.length === count) {
<<<<<<< HEAD
    for (let i = 0; i < tickets.length; i++) {
      const newTicket = await Ticket.create({
        teamOne: tickets[i].teamOne,
        date: tickets[i].date,
        teamTwo: tickets[i].teamTwo,
        leagues: tickets[i].leagues,
        imageOne: tickets[i].imageOne,
        imageTwo: tickets[i].imageTwo,
        hour: tickets[i].hour,
        stadium: tickets[i].stadium,
        address: tickets[i].address,
        stock: tickets[i].stock,
        status: tickets[i].status,
        price: tickets[i].price,
        chair: tickets[i].chair,
=======
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
>>>>>>> c4cb56703732b3ddc2d784dd5c7de8775ac0f757
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

async function getMatches() {
  const findCreated = await Match.findAll({ where: { created: true } });
  let count = await Match.count();
  if (findCreated.length === count) {
    for (let i = 0; i < matches.length; i++) {
      const newMatch = await Match.create({
        id: matches[i].id,
        home: matches[i].home,
        image_home: matches[i].image_home,
        guest: matches[i].guest,
        image_guest: matches[i].image_guest,
        date: matches[i].date,
        winner: matches[i].winner,
        league: matches[i].league,
        phase: matches[i].phase,
        state: matches[i].state,
        db: true,
      });

      for (let j = 0; j < matches[i].statistics.length; j++) {
        let cat = await Statistics.findOne({
          where: { id:  { [Op.eq]: `${matches[i].statistics[j].id}` }},
        });
        console.log(cat)

        if (cat) {
          await newMatch.addStatistics(cat);
        } else {
          let created = await Statistics.create({
            id: matches[i].statistics[j].id,
            team: matches[i].statistics[j].team,
            score: matches[i].statistics[j].score,
            twoP: matches[i].statistics[j].twoP,
            threeP: matches[i].statistics[j].threeP,
            TL: matches[i].statistics[j].TL,
            RT: matches[i].statistics[j].RT,
            losts: matches[i].statistics[j].losts,
            recovery: matches[i].statistics[j].recovery,
            
          });
          console.log(created)
          await newMatch.addStatistics(created);
        }
      }
    }
  } else return { msg: "Failed" };

  

  return { msg: "Ok" };
}

module.exports = {
<<<<<<< HEAD
  getTickets,
  getMatches
=======
  getProducts
>>>>>>> c4cb56703732b3ddc2d784dd5c7de8775ac0f757

}
