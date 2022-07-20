// import { useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
import Products from "../ProductCard/ProductCard.jsx"
import "./ProductsCards.scss"

<<<<<<< HEAD
export default function ProductsCards() {
  
  let allProducts = useSelector((state) => state.products)
// console.log("Todos los productos:", allProducts.image)
  return (
    <div className="Homepage container">
      <div className="row">
      <div className="cardsContainer col-4">
        {allProducts?.map((product) => {
          return <Products
            key={product.id}
            name={product.name}
            image = {product.image}
            price={product.price}
            description={product.description}
            categories= {product.categories.map(c=>c.name)}
            id={product.id}
          />
        })}
      </div>
=======

export default function ProductsCards({ allProducts }) {

  //   let allProducts = useSelector((state) => state.products)
  // console.log("Todos los productos:", allProducts)
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
>>>>>>> b8cabc29d8a9cf93a427d14bbcb69e6ea0bf70f6
      </div>


    </div>
  )
}
