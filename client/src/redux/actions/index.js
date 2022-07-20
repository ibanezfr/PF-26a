import axios from "axios"
export const FETCH_PRODUCTS= 'FETCH_PRODUCTS'
export const GET_BY_ID = 'GET_BY_ID';
export const CLEAN_PRODUCT = 'CLEAN_PRODUCT';

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

export const getProductsById = (id)=>{
    return async (dispatch) =>{
        let pedidoApiId = await axios.get("http://localhost:3001/products/" + id);
        dispatch({
            type: GET_BY_ID,
            payload: pedidoApiId.data
        })
    }
}

export function cleanProduct(){
    return{
        type: CLEAN_PRODUCT
    }
  }
