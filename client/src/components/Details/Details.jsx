import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  addToCart,
  bringSize,
  cleanProduct,
  getProductsById,
} from "../../redux/actions";
import "./Detail.scss";
import { formatNumber } from "../../Utils";
import heart from "../../images/heart.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../context/AuthContext";

export default function Details() {
  const params = useParams();
  const { user } = useAuth();
  const history = useHistory();
  const dispatch = useDispatch();
  const [text, setText] = useState({
    coment: "",
  });
  useEffect(() => {
    dispatch(cleanProduct());
    dispatch(getProductsById(params.id));
    dispatch(bringSize(params.id));
  }, [dispatch, params.id, params.name]);

  let actualProduct = useSelector((state) => state.detail);
  let size = useSelector((state) => state.size);

  let mappedName = actualProduct.map((p) => p.name);
  let mappedImage = actualProduct.map((p) => p.image);
  let mappedStock = actualProduct.map((p) => p.stock);
  let mappedDescription = actualProduct.map((p) => p.description);
  let mappedPrice = actualProduct.map((p) => p.price);
  let image = mappedImage[0];
  // console.log("Stock: ", mappedStock)

  const handleChange = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Must be logged to write a comment");
      history.push("/login");
    }
  };

  return (
    <div className="father">
      <div className="containerDetail">
        <div className="container1">
          <img src={image} alt="not found" />
          <span>Selecciona un talle</span>
          <select>
            {size[0] ? <option>{size[0]}</option> : null}
            {size[1] ? <option>{size[1]}</option> : null}
            {size[2] ? <option>{size[2]}</option> : null}
            {size[3] ? <option>{size[3]}</option> : null}
            {size[4] ? <option>{size[4]}</option> : null}
          </select>
        </div>
        <div className="container2">
          <h2>{mappedName}</h2>
          <h2>${formatNumber(mappedPrice)}</h2>
          <p>{mappedDescription}</p>
          <span>Stock disponible: {mappedStock}</span>
          <div className="btnContainer">
            <button onClick={() => dispatch(addToCart(params.id))}>
              Agregar al carrito
            </button>
            <button className="btnFav">
              <img src={heart} alt="Favoritos" className="btnImage" />
            </button>
          </div>
        </div>
      </div>
      <div className="formDiv">
        <Form className="form">
          <Form.Group className="mb-3 formGroup" controlId="Question">
            <Form.Label className="text">Pregunta</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={handleChange}
              name="coments"
            />
            <Button className="btn" size="sm">
              Hacer pregunta
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
