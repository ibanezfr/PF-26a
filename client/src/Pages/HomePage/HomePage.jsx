import React from "react";
import Desk from "../../components/Desk/Desk";
// import ProductsCards from "../../components/ProductsCards/ProductsCards";
// import SearchProducts from "../SearchProducts/SearchProducts";
import Carrousel from "./Carrousel";

export default function HomePage(){
    return(
        <div>
            <Carrousel/>
            <Desk/>
        </div>
    )
}
