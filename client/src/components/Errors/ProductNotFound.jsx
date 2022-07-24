import React from "react";
import productNotFound from '../../images/productNotFound.png';
import './ProductNotFound.scss'

export default function ProductNotFound (){
    return (
        <div className="errorContainer">
            <img src={productNotFound} alt='Not found'/>
        </div>
    )
}