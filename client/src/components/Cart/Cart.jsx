import React from "react";
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
        </div>
    )
}