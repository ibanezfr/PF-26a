import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart, bringSize, cleanProduct, getProductsById } from "../../redux/actions";
import './Detail.scss'
import { formatNumber } from "../../Utils";
import heart from '../../images/heart.png'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Details() {
  const params = useParams();
  const dispatch = useDispatch();    

  
  let actualProduct = useSelector(state => state.detail)
  let size = useSelector(state => state.size)
  let cart = useSelector(state=>state.cart)
  // console.log("size: ", size)
  // console.log("actualProduct ", actualProduct);
  
  useEffect(() => {
    dispatch(cleanProduct())
    dispatch(getProductsById(params.id))
    dispatch(bringSize(params.id))
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [dispatch, cart]);
 
  const [position, setPosition] = useState(0);
  const [newCart, setNewCart] = useState({
    id: "",
    name: "",
    img: "",
    size: "",
    price: "",
    stock: size[position + 1],
    quantity: 0
  })
 

  const handleSize = (e) => {
    e.preventDefault();
    setPosition(parseInt(e.target.value));
    // console.log("value: ", position)
    setNewCart({
      id: actualProduct.id,
      name: actualProduct.name,
      img: actualProduct.image,
      size: size[parseInt(e.target.value)],
      price: actualProduct.price,
      stock: size[position + 1],
      quantity: 0
    })
    // console.log("newCart stock: ", newCart) 
  }

  const handleChange = (e)=>{
    e.preventDefault();
    setNewCart({     
      ...newCart,
      quantity: e.target.value
    })
    // console.log("newCart cantidad: ", newCart)
  }

  const hanldeSubmit = (e)=>{
    e.preventDefault();
    dispatch(addToCart(newCart))
  }
console.log("newCart: ", newCart)


  return (
    <div className="father">
      <div className="containerDetail">
        <div className="container1">
          <img src={actualProduct.image} alt="not found" />
          <span>Selecciona un talle</span>
          {/* */}
          <form>
            <select defaultValue="Seleccioná un talle" onChange={e => handleSize(e)}>
              <option disabled>Seleccioná un talle</option>
              {
                size[0] === "único" ? <option name={size[0]} value={0}>{size[0]}</option> : size.map((m, index) => {
                  return (
                    (index % 2) === 0 ? <option name={m} value={index} >{m}</option> : null
                  )
                })
              }
            </select>
            <h4>Stock: {size[position + 1]}</h4>
            <label>Ingresá la cantidad que buscas</label>
            <input type="number" min={1} max={size[position + 1]} onChange={e=>handleChange(e)} value={newCart.quantity}></input>
            <div className="btnContainer">
              <button 
              onClick={(e) => hanldeSubmit(e)}
              >Agregar al carrito</button>
              <button className="btnFav"><img src={heart} alt='Favoritos' className="btnImage" /></button>
            </div>
          </form>

        </div>
        <div className="container2">

          <h2>{actualProduct.name}</h2>
          {/* <h2>${formatNumber(mappedPrice)}</h2> */}
          <p>{actualProduct.description}</p>
          {/* <span>Stock disponible: {mappedStock}</span> */}
        </div>
      </div>
      <div className="formDiv">
        <Form className="form">
          <Form.Group className="mb-3 formGroup" controlId="Question">
            <Form.Label className="text">Pregunta</Form.Label>
            <Form.Control as="textarea" rows={3} />
            <Button className="btn" size="sm">
              Hacer pregunta
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  )
}
