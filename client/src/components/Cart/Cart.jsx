import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, deleteFromCart } from "../../redux/actions";
import ProductItem from "./ProductItem";
import { useLocalStorage } from "../../useLocalStorage";

export default function Cart(){
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    JSON.parse(localStorage.getItem('cart'));

    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
  
    // console.log("cartState", cartState)

    return(
        <div>
            {
                cart[0]?cart.map((product) => 
                    <ProductItem 
                        // onChange={e => setCartState(cart)}
                        // value={cartState}
                        key={product.id}
                        data={product} 
                        addToCart={() => dispatch(addToCart(product.id))}
                        deleteOneFromCart={() => dispatch(deleteFromCart(product.id))}
                        deleteAllFromCart={() => dispatch(deleteFromCart(product.id, true))}
                    />
                ):
                <div>
                    <h2>Tu carrito está vacío</h2>
                </div> 
            }
            <button onClick={() => dispatch(clearCart())}>Limpiar Carrito</button>
        </div>
    )
}