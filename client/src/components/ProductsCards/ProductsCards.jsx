// import { useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
import ProductNotFound from "../Errors/ProductNotFound.jsx"
import Products from "../ProductCard/ProductCard.jsx"

import "./ProductsCards.css"

export default function ProductsCards({ allProducts }) {
  // console.log(allProducts)
  return (
    <div className="homePageContainer">
      
      <div className="divGral">
        <div className="cardContainer">
          {allProducts.length?<>{allProducts?.map((product) => {
            return <Products
              id={product.id}
              key={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              description={product.description}
              categories={product.categories.map(c => c.name)}
            />
          })}</>:<ProductNotFound/>}
        </div>
      </div>
    </div>
  );
};
