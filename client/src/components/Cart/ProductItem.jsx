import React from "react";
import './ProductItem.scss'
import trash from '../../images/trash.png'
import { formatNumber } from "../../Utils";
// import {Card} from 'react-bootstrap'
export default function ProductItem({data, addToCart, deleteOneFromCart, deleteAllFromCart}){
    let { id, name, price, img, quantity, stock, size} = data;

    // console.log("product values: ", product_values)

    // const mappedStock = product_values.map(p=>p.stock)
    // const mappedSize = product_values.map(p=>p.size)
    // const handleAdd = async(e) =>{
        
    //     addToCart(id)

    //     stock = stock - 1;
    //     const put = await axios.put(`http://localhost:3001/function/stock/${id}/${stock}`);
    // }

    return(
        <div className="fatherContainer">
            <div className="buttonContainer">
               <button className="deleteAllButton" onClick={()=> deleteAllFromCart(id, true)}><img className="deleteBtnImg" src={trash} alt='X'/></button>
            </div>
            <img className="itemImage" src={img} alt=""/>
            <div className="textContainer">
               <h4>{name}</h4>
               <h5>${formatNumber(price)} x {quantity} = ${formatNumber(price * quantity)}</h5>
               <span>Size:{size} <br/> Stock:{stock}</span>
            </div>
            <div className="buttonContainer">
               <button className="actionBtn" onClick={()=>  addToCart(id)}>Agregar</button>
               <button className="actionBtn" onClick={()=> deleteOneFromCart(id)}>Quitar</button>
            </div>
        </div>
    )
}