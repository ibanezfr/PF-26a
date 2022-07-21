import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { bringSize, cleanProduct, getProductsById } from "../../redux/actions";
import './Detail.css'

export default function Details(){
    
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(cleanProduct()) 
        dispatch(getProductsById(params.id))
        dispatch(bringSize(params.id))
    }, [dispatch, params.id]);

    
    let actualProduct = useSelector(state => state.detail)
    let size = useSelector(state => state.size)

    let mappedName = actualProduct.map(p=>p.name)
    let mappedImage = actualProduct.map(p=>p.image)
    let mappedDescription = actualProduct.map(p=>p.description)
    let mappedPrice = actualProduct.map(p=>p.price)
    let image = mappedImage[0]
    // console.log("talles: ", size)

    return(
        <div className="container">

            <div className="container1">
                <img src={image} alt="not found"/>
                <span>Selecciona un talle</span>
                <select>
                    {
                        size[0]? <option>{size[0]}</option> : null
                    }
                    {
                        size[1]? <option>{size[1]}</option> : null
                    }
                    {
                        size[2]? <option>{size[2]}</option> : null
                    }
                    {
                        size[3]? <option>{size[3]}</option> : null
                    }
                    {
                        size[4]? <option>{size[4]}</option> : null
                    }
                </select>
            </div>
            <div className="container2">

                <h2>{mappedName}</h2>
                <h2>{mappedPrice}</h2>
                <p>{mappedDescription}</p>
                <button>Agregar al carrito</button>

            </div>
        </div>
    )
}