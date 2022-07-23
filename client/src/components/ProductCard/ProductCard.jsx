import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import "./ProductCard.scss"
import { addToCart } from "../../redux/actions";
import { formatNumber } from "../../Utils";


export default function ProductCard({ id, name, price, image, categories}) {
  const dispatch = useDispatch();
    return (
        <div className="card">
           <img className="imagenOne" src={image} alt="not found"/>
            <div className="textContainer">
              <div className="headerContainer">
                 <h2>{name} </h2>
                 <h3>${formatNumber(price)}</h3>
              </div>
              <h6>{categories[0]} <br/> {categories[1]}</h6>
            </div>
            <button onClick={() => dispatch(addToCart(id)) }>Agregar al carrito</button>
            <Link to={'details/' + id } className='linkBtn'><button className='btnInfo'>Más información</button></Link>
        </div>
  );
}
