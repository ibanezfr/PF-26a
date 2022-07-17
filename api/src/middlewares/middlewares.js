
const tickets = require("../../../Pruebas/tickets.json");
const { Op } = require("sequelize");
const { Ticket, Fase } = require("../db");


async function getTickets() {
  const findCreated = await Ticket.findAll({ where: { created: true } });
  let count = await Ticket.count();
  if (findCreated.length === count) {
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
        db: true,
      });

      for (let j = 0; j < tickets[i].fase.length; j++) {
        let cat = await Fase.findOne({
          where: { name: { [Op.iLike]: `%${tickets[i].fase[j]}%` } },
        });

        if (cat) {
          await newTicket.addFase(cat);
        } else {
          let created = await Fase.create({
            name: tickets[i].fase[j],
          });
          await newTicket.addFase(created);
        }
      }
    }
  } else return { msg: "Failed" };

  return { msg: "Ok" };
}

module.exports = {
  getTickets

}
