import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import './filters.scss';
import trash from '../../images/trash.png';

export default function Filters({onClickFilter, onClickFieldset, products}){
    let filters = useSelector(state => state.filters);
    
    useEffect(() => {
        localStorage.setItem('filter', JSON.stringify(filters));
    }, [filters]);
    
    var categoriesInProducts = products.map((p) => p.categories.map((c) => c.name));
    let categoriesDisplayed = [];
    categoriesInProducts.map((e) => categoriesDisplayed = [...new Set([...categoriesDisplayed, ...e])]);
    
       
    return(
        <div className="filterContainer">
            {
                filters.length
                    ?
                        <>
                            <h6>Filtros Activos</h6>
                            <fieldset>
                                {filters.map(filter => 
                                    <div className='activeFilterContainer' id={filter} key={filter}onClick={(e) => onClickFieldset(e)}>
                                        {filter} <img src={trash} alt='X' />
                                    </div>
                                )}
                            </fieldset>
                        </>     
                    :   <></>
            }
               
            <h2>Encontrá lo que buscas...</h2>
            <ul className='ulElement'>
                {
                    categoriesDisplayed.sort().map(cat => {
                        if(!filters.includes(cat)) {
                            return (
                                <li className='liElement' key={cat} id={cat} onClick={(e) => onClickFilter(e)}>
                                    ►{cat}
                                </li>
                            )
                        } else return <></> //este tira el warning(ver de ponerle una key)
                    })
                }
            </ul>
        </div>
    );
};