import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart, bringSize, cleanProduct, getProductsById } from "../../redux/actions";
import './Detail.scss'
import { formatNumber } from "../../Utils";
import heart from '../../images/heart.png'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Details(){
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(cleanProduct()) 
        dispatch(getProductsById(params.id))
        dispatch(bringSize(params.id))
    }, [dispatch, params.id, params.name]);
    
    let actualProduct = useSelector(state => state.detail)
    let size = useSelector(state => state.size)
    console.log("size: ", size)

    let mappedName = actualProduct.map(p=>p.name)
    let mappedImage = actualProduct.map(p=>p.image)
    // let mappedStock = actualProduct.map(p=>p.stock)
    let mappedDescription = actualProduct.map(p=>p.description)
    let mappedPrice = actualProduct.map(p=>p.price)
    let image = mappedImage[0]
    // console.log("Stock: ", mappedStock)
    const values = actualProduct.map(p=>p.product_values)
// 

    // console.log("stock and size: ", stock, size)
    // console.log("values de stock: ", values[0])

    
    return(
        <div className="father">
          <div className="containerDetail">
            <div className="container1">
                <img src={image} alt="not found"/>
                <span>Selecciona un talle</span>
                <select>
                    {
                        size ? size.map((m, index) => {
                            return (
                                (index%2) === 0 ? <option>{m}</option> : <option>No hay info</option>
                            )
                        }) : <option>No hay info</option>
                    }
                </select>
            </div>
            <div className="container2">

                <h2>{mappedName}</h2>
                <h2>${formatNumber(mappedPrice)}</h2>
                <p>{mappedDescription}</p>
                {/* <span>Stock disponible: {mappedStock}</span> */}
                <div className="btnContainer">
                <button onClick={() => dispatch(addToCart(params.id))}>Agregar al carrito</button>
                <button className="btnFav"><img src={heart} alt='Favoritos' className="btnImage"/></button>
                </div>
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
