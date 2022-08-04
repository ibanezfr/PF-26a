import React from "react";

import { Link } from "react-router-dom";

export default function CardCategory({name,idCat}){
    console.log(name)
   
 return(
    <div>
        {name}
        <div> 
            
        <Link to={"/admin/categorias/" + idCat}>  
                        <button>Editar</button>
                        </Link>
        </div>
       

    </div>
 )
}