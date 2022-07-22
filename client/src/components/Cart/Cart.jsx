import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, deleteFromCart } from "../../redux/actions";
import ProductItem from "./ProductItem";

export default function Cart(){
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return(
        <div>
            {
                cart[0]?cart.map((product) => 
                    <ProductItem 
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