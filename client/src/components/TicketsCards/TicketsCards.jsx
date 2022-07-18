import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Tickets from "../TicketCard/TicketCard.jsx"
import "./TicketsCards.scss"




export default function TicketsCards() {
  
  let allTickets = useSelector((state) => state.tickets)

  return (
    <div className="Homepage">
      <div className="cardsContainer ">
        {allTickets?.map((ticket) => {
          return <Tickets
            key={ticket.id}
            teamOne={ticket.teamOne}
            teamTwo={ticket.teamTwo}
            date={ticket.date}
            leagues={ticket.leagues}
            imageOne={ticket.imageOne}
            imageTwo={ticket.imageTwo}
            hour={ticket.hour}
            stadium={ticket.stadium}
            price={ticket.price}
          />
        })}

      </div>


    </div>
  )
}