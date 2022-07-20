<<<<<<< HEAD
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
=======
import axios from "axios"
export const FETCH_PRODUCTS= 'FETCH_PRODUCTS'
const URL_FOR_FETCH_PRODUCTS='http://localhost:3001/products'


export function fetchProducts() {

    return function (dispatch) {
        axios.get(URL_FOR_FETCH_PRODUCTS)
            .then((product) => {
                // console.log(product)
                dispatch({
                    type: FETCH_PRODUCTS,
                    payload: product.data
                   
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
>>>>>>> d6b5bc391087c9f06517e7d0fb0a10da48c54a4c
}

// export function
