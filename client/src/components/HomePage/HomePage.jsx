import React, {  useState  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '../Pagination/Pagination.jsx';
import ProductsCards from '../ProductsCards/ProductsCards.jsx';
import { addFilter, removeFilter, setOrder } from "../../redux/actions/index";
import './HomePage.css'

function Desk() {
    const dispatch = useDispatch()
    //let displayedProducts = useSelector((state) => state.displayedProducts);
    let products = useSelector(state=>state.products)
    let categories = useSelector(state=>state.categories)
    let filters = useSelector(state=>state.filters)
    //const [orderedProducts, setOrdererProducts]=useState('')//hacerlo desde la store
    let orderedBy = useSelector(state=>state.orderBy)
    
    if(filters.length){
            products=products
            .filter(product=>{
                let productCategories= product.categories.map(cat=>cat.name)
                return filters.reduce((prevFilter,nextFilter)=>{
                    return prevFilter&&productCategories.includes(nextFilter)
            },true)})
        /* el primer filtrado, solo filtra si encuentra la categoria,
        en el segundo se fija que esten todas las categorias seleccionadas
        hace un map de los nombres de las categorias de cada producto
        y luego con el reduce devuelve true si todas las categorias del filtro estan
        en las categorias del producto, sino devuelve false */
    }    
    //sort functions
    if(orderedBy){
        switch(orderedBy){
            case 'Name-Asc':
                products=[...products.sort((p1,p2)=>{
                    if(p1.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    >p2.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) return 1;
                    else if(p1.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    <p2.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) return -1;
                    return 0;
                })]

                break;
            case "Name-Des":
                products=[...products.sort((p1,p2)=>{
                    if(p1.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")>
                    p2.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) return -1;
                    else if(p1.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    <p2.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) return 1;
                    return 0;
                })]

                break;
            case 'Price-Asc':
                products=[...products.sort((p1,p2)=>{
                    return p1.price-p2.price;
                })]

                break;
            case 'Price-Des':
                products=[...products.sort((p1,p2)=>{
                    return p2.price-p1.price;
                })]

                break;
            default://sort by rating
                break;
        }
    }
    function onSelectChange(e){
        //setOrdererProducts(e.target.value)
        dispatch(setOrder(e.target.value))
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

    }

    function onClickFieldset(e) {
        dispatch(removeFilter(e.target.id))
        setCurrentPage(1)

    }


    // console.log(currentPosts)
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
                <select name='order-by' onChange={onSelectChange}>
                    <option>Order By...</option>
                    <option value='Name-Asc'>Name-Asc</option>
                    <option value='Name-Des'>Name-Des</option>
                    <option value='Price-Asc'>Price-Asc</option>
                    <option value='Price-Des'>Price-Des</option>
                </select>
            </div>
        </div>
    )
}

export default Desk;
