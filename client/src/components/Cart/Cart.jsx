import React from "react";
<<<<<<< HEAD
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import ProductItem from './ProductItem'
import { useParams } from "react-router-dom";
import { bringCart } from "../../redux/actions";

export default function Cart(){

    //Quiero que a través de un onClick se agregue un producto al carrito
    //Puedo crear un modelo que se relacione de uno a muchos con los productos y poder traer dichos productos con la informacion básica que necesitaria
    //Tendria que hacer un ruta get, una ruta post y una ruta delete/put para poder eliminar los productos
    //En este componente iria el get trayendo la información
    //En el componente detalles iria el post en el boton de agregar al carrito
    //En el componente item iria el put/delete para modificar?? o en este componenete?

    let cartProducts = useSelector((state)=> state.cartProduct)
    // const dispatch = useDispatch();
    // const params = useParams();

    // useEffect(()=>{
    //     dispatch(bringCart(params.id))
    // }, [dispatch, params.id]);
    // console.log("cartProducts", cartProducts)
    return(
        <div>
            <div>
                {/* <h2>Tu carrito está vacío</h2> */}
                {cartProducts.length? cartProducts.map((p)=>{
                    return <ProductItem
                    id={p.id}
                    key={p.id}
                    name={p.name}
                    price={p.price}
                    />
                }): <h2>Carrito vacío</h2>}

            </div>
=======
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
>>>>>>> ba4b144036daf738019fe672b17dc7c9b3835839
        </div>
    )
}