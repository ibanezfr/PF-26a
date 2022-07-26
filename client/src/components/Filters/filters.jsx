import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeFilter } from "../../redux/actions/index";
import './filters.scss';
import trash from '../../images/trash.png';

export default function Filters({onClickFilter, onClickFieldset}){
    let filters = useSelector(state=>state.filters);
    let products = useSelector(state => state.products);

    useEffect(() => {
        localStorage.setItem('filter', JSON.stringify(filters));
    }, [filters]);

    if (filters.length) {
        products = products
            .filter(product => {
                let productCategories = product.categories.map(cat => cat.name)
                return filters.reduce((prevFilter, nextFilter) => {
                    return prevFilter && productCategories.includes(nextFilter);
                }, true);
            });
        /* el primer filtrado, solo filtra si encuentra la categoria,
        en el segundo se fija que esten todas las categorias seleccionadas
        hace un map de los nombres de las categorias de cada producto
        y luego con el reduce devuelve true si todas las categorias del filtro estan
        en las categorias del producto, sino devuelve false */
    };
    
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
                                    <div className='activeFilterContainer' id={filter} onClick={(e) => onClickFieldset(e)}>
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
                        } else return <></>
                    })
                }
            </ul>
        </div>
    );
};