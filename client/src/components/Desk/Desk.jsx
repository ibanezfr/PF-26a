import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Pagination from '../Pagination/Pagination.jsx';
import ProductsCards from '../ProductsCards/ProductsCards.jsx';

import { addFilter, removeFilter, setProductsToDisplay } from "../../redux/actions/index";

function Desk() {
    const dispatch = useDispatch()
    let products = useSelector((state) => state.displayedProducts);
    let displayedProducts = useSelector(state=>state.products)
    let categories = useSelector(state=>state.categories)
    let filters = useSelector(state=>state.filters)
    console.log('desk', products);

/*     useEffect(() => {
             dispatch(fetchProducts())
        dispatch(fetchProducts())
    }, [dispatch]) */
    if(filters.length){
        products=products
        .filter(product=>product.categories
            .filter(cat=>filters.includes(cat.name)).length>0)
        
    }
    // const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(6);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost)
    const howManyPages = Math.ceil(products.length / postPerPage)
    console.log('current post',currentPosts)
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    //filter functions


    function onClickFilter(e){
        if(!filters.includes(e.target.id)){
            dispatch(addFilter(e.target.id))
            dispatch(setProductsToDisplay(displayedProducts))
        }
        setCurrentPage(1)
    }
    
    function onClickFieldset(e){
        dispatch(removeFilter(e.target.id))
        setCurrentPage(1)
    }

    return (
        <div>
            <Pagination pages={howManyPages} setCurrentPage={pagination} />
            <ProductsCards allProducts={currentPosts}  />
            <div className="filter-container">
                {
                    filters.length?<><fieldset>{filters.map(filter=><div id={filter} onClick={onClickFieldset}>{filter} X</div>)}</fieldset></>:<></>
                }
                <ul>{categories.map(cat=>{
                    return(
                    <li id={cat} onClick={(e)=>onClickFilter(e)}>{cat}</li>
                    )
                })}</ul>
            </div>
        </div>
    )
}

export default Desk;
