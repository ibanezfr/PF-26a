import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFilter, removeFilter, setOrder } from "../../redux/actions/index";
import ProductsCards from '../ProductsCards/ProductsCards.jsx';
import Filters from '../Filters/filters';
import './HomePage.scss'
import { filterProducts } from '../../Utils';

function HomePage() {
    const dispatch = useDispatch();
    let products = useSelector(state => state.displayedProducts);
    let orderedBy = useSelector(state => state.orderBy);
    let cart = useSelector(state => state.cart);
    let filters = useSelector(state => state.filters);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    if(filters.length) {
        products = filterProducts(products, filters);
    };

    //sort functionsf
    if (orderedBy) {
        switch (orderedBy) {
            case 'Name-Asc':
                products = [...products.sort((p1, p2) => {
                    if (p1.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        > p2.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) return 1;
                    else if (p1.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        < p2.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) return -1;
                    return 0;
                })]

                break;
            case "Name-Des":
                products = [...products.sort((p1, p2) => {
                    if (p1.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") >
                        p2.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) return -1;
                    else if (p1.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        < p2.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) return 1;
                    return 0;
                })]

                break;
            case 'Price-Asc':
                products = [...products.sort((p1, p2) => {
                    return p1.price - p2.price;
                })]

                break;
            case 'Price-Des':
                products = [...products.sort((p1, p2) => {
                    return p2.price - p1.price;
                })]

                break;
            default://sort by rating? display favoritos si hay?
                break;
        }
    }

    function onSelectChange(e) {
        dispatch(setOrder(e.target.value))
    }

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


    // filter functions
    function onClickFilter(e) {
        // if (!filters.includes(e.target.id)) {
            dispatch(addFilter(e.target.id))
            // }
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
                    <select name='order-by' onChange={onSelectChange}>
                        <option>Ordenar por...</option>
                        <option value='Name-Asc'>Letras: A-Z</option>
                        <option value='Name-Des'>Letras: Z-A</option>
                        <option value='Price-Asc'>Más baratos</option>
                        <option value='Price-Des'>Más caros</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
