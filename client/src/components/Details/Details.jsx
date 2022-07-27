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

  useEffect(() => {
    dispatch(cleanProduct())
    dispatch(getProductsById(params.id))
    dispatch(bringSize(params.id))
  }, [dispatch, params.id, params.name]);

  let actualProduct = useSelector(state => state.detail)
  let size = useSelector(state => state.size)
  console.log("size: ", size)

  let mappedName = actualProduct.map(p => p.name)
  let mappedId = actualProduct.map(p => p.id);
  let mappedImage = actualProduct.map(p => p.image)
  let mappedDescription = actualProduct.map(p => p.description)
  let mappedPrice = actualProduct.map(p => p.price)
  let image = mappedImage[0]
  const values = actualProduct.map(p => p.product_values)
  const [position, setPosition] = useState(0);
  const [newCart, setNewCart] = useState({
    id: mappedId,
    name: mappedName,
    img: image,
    size: "",
    price: mappedPrice,
    stock: size[position + 1],
    quantity: 0
  })
  // setNewCart({ ...newCart, size: "algo" })

  const handleSize = (e) => {
    setPosition(parseInt(e.target.value));
    // console.log("value: ", position)
    setNewCart({
      ...newCart,
      size: e.target.name
    })
    console.log("newCart stock: ", newCart)
  }

  const handleChange = (e)=>{
    setNewCart({
      ...newCart,
      quantity: e.target.value
    })
    console.log("newCart cantidad: ", newCart)
  }



  return (
    <div className="father">
      <div className="containerDetail">
        <div className="container1">
          <img src={image} alt="not found" />
          <span>Selecciona un talle</span>
          {/* */}
          <form>
            <select defaultValue="Seleccioná un talle" onChange={e => handleSize(e)}>
              <option disabled>Seleccioná un talle</option>
              {
                size[0] === "único" ? <option>Talle único</option> : size.map((m, index) => {
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
              // onClick={() => dispatch(addToCart(params.id))}
              >Agregar al carrito</button>
              <button className="btnFav"><img src={heart} alt='Favoritos' className="btnImage" /></button>
            </div>
          </form>

        </div>
        <div className="container2">

          <h2>{mappedName}</h2>
          <h2>${formatNumber(mappedPrice)}</h2>
          <p>{mappedDescription}</p>
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
