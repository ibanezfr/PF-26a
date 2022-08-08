import React from "react";
import { Link } from "react-router-dom"
import { formatNumber } from "../../Utils";

export default function FavItem({id, name, image, price, handleRemoveFav, description}) {
    return(
        <div className="div-container">
            <div className="button-box">
               <button className="button-x" onClick={(e) => handleRemoveFav(e, id)}>X</button>
            </div>
            <div className="box-fav">
                <Link to={"details/" + id}>
                    <img className="image-f" src={image} alt=""/>
                </Link>
                <div className="text-box">
                    <h4>{name}</h4>
                    <h5>{description}</h5>
                    <h5>${formatNumber(price)}</h5>
                </div>
            </div>
        </div>
    );
};