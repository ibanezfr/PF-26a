import axios from "axios"
export const FETCH_PRODUCTS= 'FETCH_PRODUCTS'
export const FETCH_BY_NAME="FETCH_BY_NAME"
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
}


  export const getProductsByName = (name) => {
    return async (dispatch) => {
      try {
        const productsByName = await axios.get(`http://localhost:3001/products/search?name=${name}`);
      console.log("HOLA",productsByName.data)
        return dispatch({
          type: FETCH_BY_NAME,
          payload: productsByName.data,
        });
      } catch (error) {
       return alert(error);
      }
    };
  };