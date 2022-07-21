import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/actions';
// import Nav from '../Nav/Nav.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import ProductsCards from '../ProductsCards/ProductsCards.jsx';

function Desk() {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products);

    useEffect(() => {
             dispatch(fetchProducts())
        dispatch(fetchProducts())
    }, [dispatch])

    // const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(6);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost)
    const howManyPages = Math.ceil(products.length / postPerPage)

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div>
            <Pagination pages={howManyPages} setCurrentPage={pagination} />
            <ProductsCards allProducts={currentPosts}  />
        </div>
    )
}

export default Desk;
