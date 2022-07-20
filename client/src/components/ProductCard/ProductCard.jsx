import { Link } from "react-router-dom"
import "./ProductCard.scss"


export default function ProductCard({ id, name, price, description, image, categories}) {
    return (
        <div className="card">
           <img className="imagenOne" src={image} alt="not found"/>
            <div className="textContainer">
              <div className="headerContainer">
                 <h2>{name} </h2>
                 <h3>AR${price} </h3>
              </div>
              <h6>{categories[0]} <br/> {categories[1]}</h6>
            </div>
            <Link to={'details/' + id } className='linkBtn'><button className='btnInfo'>Más información</button></Link>
        </div>
        )
}