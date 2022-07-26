import React, { useEffect, useState } from "react";
import Products from "../../components/ProductCard/ProductCard.jsx";
import { useDispatch, useSelector } from "react-redux"
import "./SearchProducts.scss"
import ProductNotFound from "../../components/Errors/ProductNotFound"
import ProductsCards from "../../components/ProductsCards/ProductsCards.jsx";
//import ProductsCard from "../../components/ProductsCards/ProductsCards";


export default function SearchProducts() {
  let searchProducts = useSelector((state) => state.searchProducts)
  const dispatch = useDispatch()
  let cart = useSelector(state => state.cart)
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])


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


  return (
    <div className="Homepage containerHome">
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
      {/* <div className="row"> */}
        <div className="cardsContainer col-4">

          {currentPosts &&
            React.Children.toArray(
              currentPosts.map((product) => {
                if (product.status === "active") {
                  return (
/*                     <Products
                      id={product.id}
                      key={product.id}
                      name={product.name}
                      image={product.image}
                      price={product.price}
                      description={product.description}
                      categories={product.categories.map(c => c.name)}
                    /> */
                    <ProductsCards allProducts={searchProducts} />
                  );
                } else {
                  return (
                    <ProductNotFound/>
                  );
                }
              })
            )}

        </div>
      {/* </div> */}


    </div>


  )
}
