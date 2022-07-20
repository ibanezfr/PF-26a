import React, { useEffect, useState } from "react";
import Products from "../../components/ProductCard/ProductCard.jsx";
import { useDispatch, useSelector } from "react-redux"


export default function SearchProducts() {
    let searchProducts = useSelector((state) => state.searchProducts)

return (
    <div className="searched-container">

      <div className="section-products">
      {searchProducts &&
          React.Children.toArray(
            searchProducts.map((product) => {
              if (product.status === "active") {
                return (
                    <Products
                    key={product.id}
                    name={product.name}
                    image = {product.image}
                    price={product.price}
                    description={product.description}
                    categories= {product.categories.map(c=>c.name)}
                  />
                );
              } else {
                return null;
              }
            })
            )}


      </div>
    </div>
  );
}