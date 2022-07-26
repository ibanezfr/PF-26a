import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Order({onSelectChange}){
    let orderedBy = useSelector(state => state.orderBy)
    
    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(orderedBy));
    }, [orderedBy]);//para mantener la seleccion de ordenamiento

    return(
        <select name='order-by' onChange={(e)=>onSelectChange(e)}>
            <option>Ordenar por...</option>
            <option value='Name-Asc'>Letras: A-Z</option>
            <option value='Name-Des'>Letras: Z-A</option>
            <option value='Price-Asc'>Más baratos</option>
            <option value='Price-Des'>Más caros</option>
        </select>
    )
}