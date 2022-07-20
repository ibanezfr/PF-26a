import axios from "axios";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export function fetchProducts() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/products")
      .then((product) => {
        console.log(product);
        dispatch({
          type: FETCH_PRODUCTS,
          payload: product.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

// export function
