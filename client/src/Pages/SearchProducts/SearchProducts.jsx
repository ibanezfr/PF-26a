import React, { useState } from "react";
// import Products from "../../components/ProductCard/ProductCard.jsx";
import { useDispatch, useSelector } from "react-redux"
import { addFilter, removeFilter, setOrder } from "../../redux/actions/index";
import "./SearchProducts.scss"
import ProductNotFound from "../../components/Errors/ProductNotFound"
import ProductsCards from "../../components/ProductsCards/ProductsCards.jsx";
//import ProductsCard from "../../components/ProductsCards/ProductsCards";
// import { onSelectChange } from "../../Utils";
import Filters from '../../components/Filters/filters';
import Order from '../../components/Order/order'



export default function SearchProducts() {
  let searchProducts = useSelector((state) => state.searchProducts)
  const dispatch = useDispatch()
  // let cart = useSelector(state => state.cart)
  // useEffect(() => {
  //   localStorage.setItem('cart', JSON.stringify(cart));
  // }, [cart])

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = searchProducts.slice(indexOfFirstPost, indexOfLastPost)
  const howManyPages = Math.ceil(searchProducts.length / postPerPage)
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
    <div className="totalHomeContainer">
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
          {currentPosts &&
            React.Children.toArray(
              currentPosts.map((product) => {
                if (product.status === "active") {
                  return (
                    <div className='homeContainer'>
                      <ProductsCards allProducts={currentPosts} />
                      <div className="filter-container">
                          <Filters onClickFilter={onClickFilter} onClickFieldset={onClickFieldset} products={searchProducts}/>
                          <Order onSelectChange={onSelectChange}/>
                      </div>
                  </div>

                  );
                } else {
                  return (
                    <ProductNotFound/>
                  );
                }
              })
            )}
    </div>


  )
}
