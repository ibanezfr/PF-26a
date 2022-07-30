import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFilter, removeFilter, setOrder, setSearchStatus } from "../../redux/actions/index";
import ProductsCards from '../../components/ProductsCards/ProductsCards.jsx';
import Filters from '../../components/Filters/filters';
import Order from '../../components/Order/order'
import './HomePage.scss'
import { filterProducts } from '../../Utils';

function HomePage() {
    const dispatch = useDispatch();
    let dispProds = useSelector(state => state.displayedProducts);
    // let orderedBy = useSelector(state => state.orderBy);
    let cart = useSelector(state => state.cart);
    let filters = useSelector(state => state.filters);
    let isSearchActive = useSelector(state => state.isSearchActive)
    let searchProducts = useSelector((state) => state.searchProducts)
    let products= dispProds

    if(isSearchActive){
        products = searchProducts
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        //products = dispProds
    }, [cart, isSearchActive]);

    if(filters.length) {
        products = filterProducts(products, filters);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(6);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost)
    const howManyPages = Math.ceil(products.length / postPerPage)

    let numberOfPages = [];
    for (let i = 1; i <= howManyPages; i++) {
        numberOfPages.push(i);
    }

    //order
    function onSelectChange(e) {
        dispatch(setOrder(e.target.value))
    }

    // filter functions
   function onClickFilter(e) {
        dispatch(addFilter(e.target.id))
        setCurrentPage(1)
    }

    function onClickFieldset(e) {
        dispatch(removeFilter(e.target.id))
        setCurrentPage(1)
    }

    return (
        <div className='totalHomeContainer'>
            <div className='paginationContainer'>
                <button
                    className={`${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => setCurrentPage(prev => prev <= 1 ? prev : prev - 1)}
                >
                    Prev
                </button>
                <button>{currentPage}</button>
                <button
                    className={`${currentPage === numberOfPages.length ? 'disabled' : ''}`}
                    onClick={() => setCurrentPage(prev => prev >= numberOfPages.length ? prev : prev + 1)}
                >
                    Next
                </button>

            </div>
            <div className='homeContainer'>
                <ProductsCards allProducts={currentPosts} />
                <div className="filter-container">
                <Filters onClickFilter={onClickFilter} onClickFieldset={onClickFieldset} products={products}/>
                <Order onSelectChange={onSelectChange}/>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
