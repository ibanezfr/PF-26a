import React from "react";
import './ProductItem.scss'
import trash from '../../images/trash.png'
import { formatNumber } from "../../Utils";
// import {Card} from 'react-bootstrap'
export default function ProductItem({data, changeQuantity, deleteAllFromCart}){
    let { name, price, img, quantity, stock, size} = data;

    return(
        <div className="fatherContainer">
            <div className="buttonContainer">
               <button className="deleteAllButton" onClick={(e)=> deleteAllFromCart(e, data)}><img className="deleteBtnImg" src={trash} alt='X'/></button>
            </div>
            <img className="itemImage" src={img} alt=""/>
            <div className="textContainer">
               <h4>{name}</h4>
               <h5>${formatNumber(price)} x {quantity} = ${formatNumber(price * quantity)}</h5>
               <span>Size: {size} <br/> Stock: {stock}</span>
            </div>
            <div className="buttonContainer">
               <button className="actionBtn" onClick={(e)=>  changeQuantity(e, data, true)}>Agregar</button>
               <button className="actionBtn" onClick={(e)=> changeQuantity(e, data, false)}>Quitar</button>
            </div>
        </div>
    )
}
