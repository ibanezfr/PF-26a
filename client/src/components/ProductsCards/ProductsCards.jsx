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
              key={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              description={product.description}
              categories={product.categories.map(c => c.name)}
            />
          })}
        </div>
      </div>
    </div>
  )
}
