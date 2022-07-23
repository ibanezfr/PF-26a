import React, {  useState  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '../Pagination/Pagination.jsx';
import ProductsCards from '../ProductsCards/ProductsCards.jsx';
import { addFilter, removeFilter, setProductsToDisplay } from "../../redux/actions/index";
import './HomePage.css'

function Desk() {
    const dispatch = useDispatch()
    //let displayedProducts = useSelector((state) => state.displayedProducts);
    let products = useSelector(state => state.products)
    let categories = useSelector(state => state.categories)
    let filters = useSelector(state => state.filters)
    const [displayedProducts, setDisplayedProducts] = useState([])
    /*     
        if(filters.length){
            if(filters.length > 1) {
                products=displayedProducts
                products=products
                .filter(product=>{
                    let productCategories= product.categories.map(cat=>cat.name)
                    return filters.reduce((prevFilter,nextFilter)=>{
                        return prevFilter&&productCategories.includes(nextFilter)
                },true)})
            }/* el primer filtrado, solo filtra si encuentra la categoria,
            en el segundo se fija que esten todas las categorias seleccionadas
            hace un map de los nombres de las categorias de cada producto
            y luego con el reduce devuelve true si todas las categorias del filtro estan
            en las categorias del producto, sino devuelve false 
            else{
                products=products
                .filter(product=>product.categories
                    .filter(cat=>filters.includes(cat.name)).length>0)
            }
        }
         */
    if (filters.length) {
        products = products
            .filter(product => {
                let productCategories = product.categories.map(cat => cat.name)
                return filters.reduce((prevFilter, nextFilter) => {
                    return prevFilter && productCategories.includes(nextFilter)
                }, true)
            })
        /* el primer filtrado, solo filtra si encuentra la categoria,
        en el segundo se fija que esten todas las categorias seleccionadas
        hace un map de los nombres de las categorias de cada producto
        y luego con el reduce devuelve true si todas las categorias del filtro estan
        en las categorias del producto, sino devuelve false */
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(6);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost)
    const howManyPages = Math.ceil(products.length / postPerPage)


    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }



    //filter functions
    function onClickFilter(e) {
        if (!filters.includes(e.target.id)) {
            dispatch(addFilter(e.target.id))
        }
        setCurrentPage(1)
        setDisplayedProducts(products)
    }

    function onClickFieldset(e) {
        dispatch(removeFilter(e.target.id))
        setCurrentPage(1)
        setDisplayedProducts(products)
    }

    return (
        <div>
            <Pagination pages={howManyPages} setCurrentPage={pagination} />
            <ProductsCards allProducts={currentPosts} />
            <div className="filter-container">
                {
                    filters.length ? <><fieldset>{filters.map(filter => <div id={filter} onClick={onClickFieldset}>{filter} X</div>)}</fieldset></> : <></>
                }
                <ul>{categories.map(cat => {
                    return (
                        <li key={cat} id={cat} onClick={(e) => onClickFilter(e)}>{cat}</li>
                    )
                })}</ul>
                <select>
                    <option>Order By...</option>
                    <option>Name-Asc</option>
                    <option>Name-Des</option>
                    <option>Price-Asc</option>
                    <option>Price-Des</option>
                </select>
            </div>
        </div>
    )
}

export default Desk;
