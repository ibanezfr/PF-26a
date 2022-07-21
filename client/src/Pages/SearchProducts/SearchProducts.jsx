import React, { useEffect, useState } from "react";
import Products from "../../components/ProductCard/ProductCard.jsx";
import { useDispatch, useSelector } from "react-redux"
import Pagination from '../../components/Pagination/Pagination.jsx';
// import { getProductsByName,fetchProducts} from '../../redux/actions';
import "./SearchProducts.scss"


export default function SearchProducts() {
    let searchProducts = useSelector((state) => state.searchProducts)
    const dispatch = useDispatch()
     useEffect(() => {
      
    }, [dispatch])


    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(3);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = searchProducts.slice(indexOfFirstPost, indexOfLastPost)
    const howManyPages = Math.ceil(searchProducts.length / postPerPage)

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

return (
  <div className="Homepage container">
    <Pagination pages={howManyPages} setCurrentPage={pagination} />
  <div className="row">
    <div className="cardsContainer col-4">
    
      {currentPosts && 
          React.Children.toArray(
            currentPosts.map((product) => {
              if (product.status === "active") {
                return (
                    <Products
                    key={product.id}
                    name={product.name}
                    image = {product.image}
                    price={product.price}
                    description={product.description}
                    categories= {product.categories.map(c=>c.name)}
                    id={product.id}
                  />
                );
              } else {
                return null;
              }
            })
            )}
   
    </div>
  </div>


</div>
      

)  
}
