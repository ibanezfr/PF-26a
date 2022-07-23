import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, deleteFromCart } from "../../redux/actions";
import ProductItem from "./ProductItem";
// import { useLocalStorage } from "../../useLocalStorage";
import Button from "react-bootstrap/esm/Button";
import './Cart.css'
import CheckoutForm from "./CheckoutForm.jsx"

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
 
} from "@stripe/react-stripe-js";



const stripePromise = loadStripe("pk_test_51LDapSLLyNiW7nbRQYImFmTBLwYKDGGcm8FGuW5bCepjRqE969YH6eAoS8q7mhBpAkXYPYH9T002QhQfVXDcGd7w00kRYp2bdI");

export default function Cart() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    JSON.parse(localStorage.getItem('cart'));

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);


    return (
        <div className="maxContainer">
            <div className='allCardsContainer'>
                {
                    cart[0] ? cart.map((product) =>
                        <div className="productItemContainer">
                            <ProductItem
                                key={product.id}
                                data={product}
                                addToCart={() => dispatch(addToCart(product.id))}
                                deleteOneFromCart={() => dispatch(deleteFromCart(product.id))}
                                deleteAllFromCart={() => dispatch(deleteFromCart(product.id, true))}
                            />
                        </div>
                    ) :
                        <div>
                            <h2>Upss...</h2>
                            <h3>Tu carrito está vacío</h3>
                        </div>
                }
            </div>
            <div className="btnContainer">
                <Elements stripe={stripePromise}>
                    <div className="container p-4">
                        <div className="row h-100">
                            <div className="col-md-4 offset-md-4 h-100">
                                <CheckoutForm />
                            </div>
                        </div>
                    </div>
                </Elements>
                <button className="btnPrincipal">Continuar compra</button>
                <button className="secondaryBtn" onClick={() => dispatch(clearCart())}>Limpiar carrito</button>
            </div>
            {/* <button onClick={() => dispatch(clearCart())}>Limpiar Carrito</button> */}
        </div>
    )
}