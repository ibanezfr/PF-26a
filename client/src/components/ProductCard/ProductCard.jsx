import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import "./ProductCard.css"
import { addToCart } from "../../redux/actions";
import { formatNumber } from "../../Utils";
import FastPurchase from "../Purchase/FastPurchase";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";


export default function ProductCard({ id, name, price, image, categories }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  
  // console.log(id)
  return (
    <div className="card">
      <div className="imgContainer">
        <img className="imagenOne" src={image} alt="not found" />
      </div>
      <div className="bodyContainer">
        <div className="category">
          <Link to={'details/' + id} className='linkBtn'><button className='btnInfo '>Detalles</button></Link>
        </div>
        <div className="titleProduct">
          <h2>{name} </h2>
        </div>
        <div className="cardFooter">
          <h3 className="price">${formatNumber(price)}</h3>
          <h6 className="categoryText">{categories[0]} <br /> {categories[1]} <br /> {categories[2] && categories[2]}</h6>
          <button className="btnInfo2" onClick={() => dispatch(addToCart(id))}>Compra rápida</button>
          <FastPurchase setShow={setShow} show={show} image={image} name={name} price={price} id={id}/>
          <Button variant="primary" onClick={() => setShow(true)}>
            Compra rápida
          </Button>
        </div>
      </div>
      {/* <button onClick={() => dispatch(addToCart(id)) }>Agregar al carrito</button> */}
      {/* <Link to={'details/' + id } className='linkBtn'><button className='btnInfo'>Más información</button></Link> */}
    </div>
  );
}
