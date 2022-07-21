import React from "react";
import {Card} from 'react-bootstrap'
export default function productItem({price, size, name, image}){
    return(
        <Card bg="primary" text="white"> 
        <Card.Img variant="top" src={image} />  
           <Card.Body>  
              <Card.Title>{name}</Card.Title> 
              <Card.Text>{price}</Card.Text>  
              <Card.Text>{size}</Card.Text>  
           </Card.Body>
        </Card> 
    )
}