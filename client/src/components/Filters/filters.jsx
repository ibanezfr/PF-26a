import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Filters(){
    let displayedProducts = useSelector(state=>state.displayedProducts)
    let categories = useSelector(state=>state.categories)
    let filters = useSelector(state=>state.filters)
    filters = ['Gorros']
    console.log(displayedProducts)
    if(filters.length){
        displayedProducts=displayedProducts
        .filter(product=>product.categories
            .filter(cat=>filters.includes(cat.name)).length>0)
    }
    console.log(displayedProducts)
    return(
        <div>
            {
                filters.length?<><fieldset>{filters.map(filter=><a>{filter}</a>)}</fieldset></>:<></>
            }
            <ul>{categories.map(cat=>{
                return(
                <li><a>{cat}</a></li>
                )
            })}</ul>
        </div>
    )
}