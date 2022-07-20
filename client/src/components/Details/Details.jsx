import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanProduct, getProductsById } from "../../redux/actions";
// import '../../../../Pruebas/products.json'

import Products from "../ProductCard/ProductCard.jsx"


export default function Details(){
    
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(cleanProduct()) 
        dispatch(getProductsById(params.id))
    }, [dispatch, params.id]);

    
    let actualProduct = useSelector(state => state.detail)
    console.log("actualProduct: ", actualProduct)
    console.log("actualProduct[0]: ", actualProduct[0])

    let mapedProduct = actualProduct.map(p=>{
        return{
            name : p.name,
            image: p.image

        }
    })

    let mappedName = actualProduct.map(p=>p.name)
    let mappedImage = actualProduct.map(p=>p.image)
    let mappedDescription = actualProduct.map(p=>p.description)
    let mappedCategories = actualProduct.map(p=>p.categories.name)
    let mappedPrice = actualProduct.map(p=>p.price)
    let mappedSize = actualProduct.map(p=>p.size)

    console.log("mappedName: ", mappedName)

    console.log("image: ", mapedProduct.image)

    return(
        <div className="container">

            {
                actualProduct?.map(p=>{
                    console.log("image Map: ", p.image)
                    return(
                        <div>
                        <h1>{p.name}</h1>
                        <img src={p.image} alt="not found"/>
                        </div>
                    )
                })
            }
            {/* <div className="container1">
                <img src={mapedProduct.image} alt="not found"/>
                <span>Selecciona un talle</span>
                <select>
                    <option>renderizado</option>
                </select>
            </div>
            <div className="container2">
                <h5>{mappedCategories}</h5>

                <h2>{mappedName}</h2>
                <h2>{mappedPrice}</h2>
                <p>{mappedDescription}</p>
                <button>Agregar al carrito</button>

            </div> */}
        </div>
    )
}