import React from "react";
import {Card} from 'react-bootstrap'
export default function ProductItem({data, addToCart, deleteOneFromCart, deleteAllFromCart}){
    let { id, name, price, image, quantity } = data;
    return(
        // <Card bg="primary" text="white"> 
        // <Card.Img variant="top" src={image} />  
        //    <Card.Body>  
        //       <Card.Title>{name}</Card.Title> 
        //       <Card.Text>{price}</Card.Text>  
        //       <Card.Text>{size}</Card.Text>  
        //    </Card.Body>
        // </Card> 
        <div>
            <img src={image} alt="" style={{width: "15%"}}/>
            <h4>{name}</h4>
            <h5>{price} x {quantity} = ${price * quantity}</h5>
            <button onClick={()=> addToCart(id)}>Agregar uno mas</button>
            <button onClick={()=> deleteOneFromCart(id)}>Restar uno</button>
            <button onClick={()=> deleteAllFromCart(id, true)}>Eliminar todos</button>
        </div>
    )
}