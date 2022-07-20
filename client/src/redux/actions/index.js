import axios from "axios"
export const FETCH_PRODUCTS= 'FETCH_PRODUCTS'
export const FETCH_BY_NAME="FETCH_BY_NAME"
export function fetchProducts() {

    return function (dispatch) {
        axios.get('http://localhost:3001/products')
            .then((product) => {
                console.log(product)
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
      
        return dispatch({
          type: FETCH_BY_NAME,
          payload: productsByName.data,
        });
      } catch (error) {
        console.log(error, '||Error||');
      }
    };
  };