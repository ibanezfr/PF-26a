// import { useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
import Products from "../ProductCard/ProductCard.jsx"

import "./ProductsCards.scss"

export default function ProductsCards({ allProducts }) {

  return (
    <div className="Homepage container">
      
      <div className="row">
        <div className="cardsContainer col-4">
          {allProducts?.map((product) => {
            return <Products
              id={product.id}
              key={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              description={product.description}
              categories={product.categories.map(c => c.name)}
<<<<<<< HEAD
              
=======
>>>>>>> ba4b144036daf738019fe672b17dc7c9b3835839
            />
          })}
        </div>
      </div>
    </div>
  );
};
