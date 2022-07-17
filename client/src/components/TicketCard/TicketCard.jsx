import "./TicketCard.scss"


export default function TicketCard({ teamOne, teamTwo, date, leagues, imageOne, imageTwo, hour, stadium, address, stock, price, chair, fase }) {
    return (
        <div className="card">
  
            <div className="teamImage">
                <div className="imagenOne"> <img className="card-image" src={`${imageOne}`} alt={`${teamOne}`} width="100x" height="130px" /> </div>
                <div className="imagenTwo"><img className="card-image" src={`${imageTwo}`} alt={`${teamTwo}`} width="100px" height="130px" /> </div>
            </div>
         <div>
            <span>{teamOne} </span>
            <span>{teamTwo} </span>
         </div>
        <div>
            <span>{date} </span>
            <span>{hour} </span>
        </div>
            <span>{leagues} </span>
            
            <span>{stadium} </span>
            <span>{price} </span>



        </div>)
}