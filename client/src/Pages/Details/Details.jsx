import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart, bringAnswers, bringQandA, bringSize, getProductsById } from "../../redux/actions";
import './Detail.scss'
import './QandA.scss'
// import { formatNumber } from "../../Utils";
import heart from '../../images/heart.png'
import Carousel from 'react-bootstrap/Carousel';
import QuestionForm from "./QuestionForm";

export default function Details() {
  const params = useParams();
  const dispatch = useDispatch();

  let actualProduct = useSelector(state => state.detail)
  let size = useSelector(state => state.size)
  let cart = useSelector(state => state.cart)
  let QandA = useSelector(state => state.infoQuestion)
  let answers = useSelector(state => state.infoAnswer);


  useEffect(() => {
    dispatch(getProductsById(params.id))
    dispatch(bringSize(params.id))
    dispatch(bringQandA(params.id))
    dispatch(bringAnswers(params.id))
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [dispatch, cart]);


  console.log("qanda: ", QandA)


  const [newCart, setNewCart] = useState({
    id: "",
    name: "",
    img: "",
    size: "",
    price: "",
    stock: size[1],
    quantity: 0
  });

  const handleSize = (e) => {
    e.preventDefault();
    setNewCart({
      id: actualProduct.id,
      name: actualProduct.name,
      img: actualProduct.image,
      size: size[e.target.value],
      price: actualProduct.price,
      stock: size[1],
      quantity: 0
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNewCart({
      ...newCart,
      quantity: parseInt(e.target.value)
    });
  };

  const hanldeSubmit = (e) => {
    e.preventDefault();
    if (newCart.size === "" || newCart.quantity === 0) {
      alert("selecciona un talle y una cantidad");
    } else {
      dispatch(addToCart(newCart));
    };
  };

  return (
    <div className="father">
      <div className="containerDetail">
        <div className="container1">
          {/* <img src={actualProduct.image} alt="not found" /> */}


          <Carousel fade>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={actualProduct.image}
                alt="First slide"
              />
            </Carousel.Item>
            {
              actualProduct.image2 ?
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={actualProduct.image2}
                    alt="Second slide"
                  />
                </Carousel.Item> : null
            }
            {
              actualProduct.image3 ?
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={actualProduct.image2}
                    alt="Second slide"
                  />
                </Carousel.Item> : null
            }
            {
              actualProduct.image4 ?
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={actualProduct.image2}
                    alt="Second slide"
                  />
                </Carousel.Item> : null
            }
          </Carousel>


          <span>Selecciona un talle</span>
          <form>
            <select defaultValue="Seleccioná un talle" onChange={e => handleSize(e)}>
              <option disabled>Seleccioná un talle</option>
              {
                size[0] === "único" ? <option name={size[0]} value={0}>{size[0]}</option> : size.map((m, index) => {
                  return (
                    (index % 2) === 0 ? <option key={index} name={m} value={index} >{m}</option> : null
                  )
                })
              }
            </select>
            <h4>Stock: {size[1]}</h4>
            <label>Ingresá la cantidad que buscas</label>
            <input type="number" min={1} max={size[1]} onChange={e => handleChange(e)} value={newCart.quantity}></input>
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
          {/* <h2>${formatNumber(actualProduct.price)}</h2> */}
          <p>{actualProduct.description}</p>
        </div>
      </div>
      <div>
        <QuestionForm/>
        {/* <div className="QandAMaxContainer">
          <h2 className="titleQuestion">También preguntaron:</h2>
          {
                QandA ? QandA.map((m, index) => {
                  return (
                    (index % 2) === 0 ? <div className="QandAContainer"><div className="question"><h2>{m}</h2><p>{QandA[index+1]}</p></div>
                   <div className="answer"><p>{answers[index]}</p></div> </div> : null
                  )
                }) : <div className="questionNull">No hay preguntas</div>
              }
        </div> */}
      </div>
    </div>
  )
};
