import React from "react";
import { Link } from "react-router-dom"
import { formatNumber } from "../../Utils";

export default function FavItem({id, name, image, price, handleRemoveFav}) {
    return(
        <div className="fatherContainer">
            <div className="buttonContainer">
               <button className="deleteAllButton" onClick={(e) => handleRemoveFav(e, id)}>X</button>
            </div>
            <Link to={"details/" + id}>
                <img className="itemImage" src={image} alt=""/>
            </Link>
            <div className="textContainer">
               <h4>{name}</h4>
               <h5>${formatNumber(price)}</h5>
            </div>
        </div>
    );
};