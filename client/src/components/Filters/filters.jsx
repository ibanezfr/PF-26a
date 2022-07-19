import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Filters(){

    let categories = useSelector(state=>state.categories)
    //console.log('all categories', categories)
    return(
        <div>
            <ul>{categories.map(cat=>{
                return(
                <li>{cat}</li>    
                )
            })}</ul>
        </div>
    )
}