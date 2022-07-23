import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, deleteFromCart } from "../../redux/actions";
import ProductItem from "./ProductItem";
// import { useLocalStorage } from "../../useLocalStorage";
import Button from "react-bootstrap/esm/Button";
import './Cart.css'

export default function Cart(){
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    JSON.parse(localStorage.getItem('cart'));

    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
  

    return(
        <div className="maxContainer">
            <div  className='allCardsContainer'>
            {
                cart[0]?cart.map((product) => 
                <div className="productItemContainer">
                    <ProductItem 
                        key={product.id}
                        data={product} 
                        addToCart={() => dispatch(addToCart(product.id))}
                        deleteOneFromCart={() => dispatch(deleteFromCart(product.id))}
                        deleteAllFromCart={() => dispatch(deleteFromCart(product.id, true))}
                    />
                </div>
                ):
                <div>
                    <h2>Upss...</h2>
                    <h3>Tu carrito está vacío</h3>
                </div> 
            }
            </div>
            <div className="btnContainer">
            <button className="btnPrincipal">Continuar compra</button>
            <button className="secondaryBtn" onClick={()=> dispatch(clearCart())}>Limpiar carrito</button>
            </div>
            {/* <button onClick={() => dispatch(clearCart())}>Limpiar Carrito</button> */}
        </div>
    )
}