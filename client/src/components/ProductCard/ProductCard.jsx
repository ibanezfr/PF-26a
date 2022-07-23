import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import "./ProductCard.css"
import { addToCart } from "../../redux/actions";
import { formatNumber } from "../../Utils";


export default function ProductCard({ id, name, price, image, categories}) {
  const dispatch = useDispatch();
    return (
        <div className="card">
          <div className="imgContainer">
              <img className="imagenOne" src={image} alt="not found"/>
          </div>
            <div className="bodyContainer">
              <div className="category">
                <Link to={'details/' + id } className='linkBtn'><button className='btnInfo '>Detalles</button></Link>
              </div>
              <div className="titleProduct">
                <h2>{name} </h2>
              </div>
              <div className="cardFooter">
                <h3 className="price">${formatNumber(price)}</h3>
                <h6 className="categoryText">{categories[0]} <br/> {categories[1]}</h6>
                <button className="btnInfo2" onClick={() => dispatch(addToCart(id)) }>Agregar al carrito</button>
              </div>
            </div>
            {/* <button onClick={() => dispatch(addToCart(id)) }>Agregar al carrito</button> */}
            {/* <Link to={'details/' + id } className='linkBtn'><button className='btnInfo'>Más información</button></Link> */}
        </div>
  );
}
