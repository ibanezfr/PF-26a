import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { bringAnswers, bringQandA, addFavsToUser, addToCart, bringSize, getFavsFromUser, getProductsById, removeFavsFromUser } from "../../redux/actions";
import './Detail.scss'
import './QandA.scss'
import { cartController, formatNumber } from "../../Utils";
import heartA from '../../images/heartAdd.png';
import heartR from "../../images/heartRemove.png";
import Carousel from 'react-bootstrap/Carousel';
import QuestionForm from "./QuestionForm";
import { useAuth } from "../../context/AuthContext";
import Swal from 'sweetalert2'

export default function Details() {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const history = useHistory();

  let actualProduct = useSelector(state => state.detail)
  let size = useSelector(state => state.size)
  let cart = useSelector(state => state.cart)
  // let QandA = useSelector(state => state.infoQuestion)
  // let answers = useSelector(state => state.infoAnswer);
  let favs = useSelector(state => state.favs);
  var isFavorite = favs.find((f) => f.id === params.id);

  const [position, setPosition] = useState(0);

  useEffect(() => {
    handleFavs();
    dispatch(getProductsById(params.id))
    dispatch(bringSize(params.id))
    dispatch(bringQandA(params.id))
    dispatch(bringAnswers(params.id))
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart, dispatch, params.id]);

  const [newCart, setNewCart] = useState({
    id: "",
    name: "",
    img: "",
    size: "",
    price: "",
    stock: size[1],
    quantity: 0
  });

  const handleFavs = () => {
    if (user) {
      dispatch(getFavsFromUser(user.uid));
    };
  };

  const handleRemoveFav = (e) => {
    e.preventDefault();
    dispatch(removeFavsFromUser(user.uid, params.id));
  };

  const handleAddFav = (e) => {
    if (!user) return Swal.fire({
      title: 'No estás logueado',
      text: "Para poder guardar los productos en tu lista de favoritos debes loguearte primero!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iniciar sesión'
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/login")
      }
    })
    e.preventDefault();
    let data = { userID: user.uid, productID: params.id }
    dispatch(addFavsToUser(data));
  };

  const handleSize = (e) => {
    e.preventDefault();
    setPosition(parseInt(e.target.value) + 1);
    setNewCart({
      id: actualProduct.id,
      name: actualProduct.name,
      img: actualProduct.image,
      size: size[e.target.value],
      price: actualProduct.price,
      stock: size[parseInt(e.target.value) + 1],
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
    var bool = false;
    cartController(Swal, newCart.size, newCart.stock, newCart.quantity, bool);
    if (bool) {
      dispatch(addToCart(newCart));
    };
  };
  
  return (
    <div className="father">
      <div className="containerDetail">
        {
          isFavorite
            ?
            <button className="btnFav">
              <img src={heartR} alt='Favoritos' className="btnImage" onClick={(e) => handleRemoveFav(e)} />
            </button>
            :
            <button className="btnFav">
              <img src={heartA} alt='Favoritos' className="btnImage" onClick={(e) => handleAddFav(e)} />
            </button>
        }
        <div className="container1">
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
                size[0] === "único" 
                ?
                  <option name={size[0]} value={0}> {size[0]} </option>
                : 
                  size.map((m, index) => {
                    return (
                      (index % 2) === 0
                      &&
                        <option key={index} name={m} value={index}> {m} </option> 
                    )
                  })
              }
            </select>
            {
              position !== 0 && <h4>Stock: {size[position]}</h4>
            }
            <label>Ingresá la cantidad que buscas</label>
            <input type="number" min={1} max={size[position]} onChange={e => handleChange(e)} value={newCart.quantity}></input>
            <div className="btnContainer">
              <button onClick={(e) => hanldeSubmit(e)}>
                Agregar al carrito
              </button>
            </div>
          </form>
        </div >
        <div className="container2">
          <h2>{actualProduct.name}</h2>
          <h2>${formatNumber(actualProduct.price)}</h2>
          <p>{actualProduct.description}</p>
        </div>
      </div >
      <div>
        <QuestionForm />
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
    </div >
  )
};
