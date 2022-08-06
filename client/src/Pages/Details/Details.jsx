import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addFavsToUser, addToCart, bringSize, getFavsFromUser, getProductsById, removeFavsFromUser } from "../../redux/actions";
import './Detail.scss'
import './QandA.scss'
import { cartController, formatNumber } from "../../Utils";
// import { formatNumber } from "../../Utils";
import heartA from '../../images/heartAdd.png';
import heartR from "../../images/heartRemove.png";
import Carousel from 'react-bootstrap/Carousel';
import QuestionForm from "./QuestionForm";
import { useAuth } from "../../context/AuthContext";
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next';

export default function Details() {
  const { t } = useTranslation();
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const history = useHistory();

  let actualProduct = useSelector(state => state.detail)
  let size = useSelector(state => state.size)
  let cart = useSelector(state => state.cart)
  let favs = useSelector(state => state.favs);
  var isFavorite = favs.find((f) => f.id === params.id);

  const [position, setPosition] = useState(0);

  useEffect(() => {
    handleFavs();
    dispatch(getProductsById(params.id))
    dispatch(bringSize(params.id))
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
      title: t('details.title'),
      text: t('details.text'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: t('details.cancelButtonText'),
      confirmButtonText: t('details.confirmButtonText')
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

    var bool = cartController(Swal, newCart.size, newCart.stock, newCart.quantity);
    if (bool === true) {
      dispatch(addToCart(newCart));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto añadido al carrito',
        showConfirmButton: false,
        timer: 1000
      });
    };
  };

  return (
    <div className="father">

      <div className="containerDetail">
        <div className="isFavorite">
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
        </div>

        <div className="containerInfoDetail">
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
          </div>


          <div className="container2">
            <h2>{actualProduct.name}</h2>
            <p>{actualProduct.description}</p>
          </div>

        </div>

        <div className="container3">
          <form>
            <div className="containerMedium">
              <div>
                <h4>{t('details.choseSize')}</h4>
              </div>
              <select defaultValue={t('details.choseSize')} onChange={e => handleSize(e)}>
                <option value="selected" hidden>{t('details.disabled')}</option>

                {
                  size[0] === "único" ? <option name={size[0]} value={0}>{size[0]}</option> : size.map((m, index) => {
                    return (
                      (index % 2) === 0 ? <option key={index} name={m} value={index} >{m}</option> : null
                    )
                  })
                }
              </select>
              {
                position !== 0 && <span>{t('details.stock')}{size[position]}</span>
              }
            </div>
            <div className="containerMedium2">
              <label className="label">{t('details.labelStock')}</label>
              <input type="number" min={1} max={size[position]} onChange={e => handleChange(e)} value={newCart.quantity}></input>
            </div>
            <div className="btnContainer">
              <button onClick={(e) => hanldeSubmit(e)}>
                {t('details.addToCart')}
              </button>
            </div>
          </form>
        </div>
      </div >
      <div>
        <QuestionForm />
      </div>
    </div >
  )
};
