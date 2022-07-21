import axios from "axios"
export const GET_BY_ID = 'GET_BY_ID';
export const CLEAN_PRODUCT = 'CLEAN_PRODUCT';
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_BY_NAME = "FETCH_BY_NAME";
export const GET_SIZE = 'GET_SIZE';

//carrito de compras
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_ONE_FROM_CART = 'REMOVE_ONE_FROM_CART';
export const REMOVE_ALL_FROM_CART = 'REMOVE_ALL_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
const URL_FOR_FETCH_PRODUCTS = "http://localhost:3001/products";

export function fetchProducts() {
  return function (dispatch) {
    axios
      .get(URL_FOR_FETCH_PRODUCTS)
      .then((product) => {
        // console.log(product)
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

  export function bringSize(id){
    return async (dispatch) =>{
      let size = await axios.get("http://localhost:3001/products/size/" + id);
      console.log("en la action: ", size.data)
      dispatch({
          type: GET_SIZE,
          payload: size.data
      })
  }
  }

export const getProductsByName = (name) => {
  return async (dispatch) => {
    try {
      const productsByName = await axios.get(
        `http://localhost:3001/products/search?name=${name}`
      );
      console.log("HOLA", productsByName.data);
      return dispatch({
        type: FETCH_BY_NAME,
        payload: productsByName.data,
      });
    } catch (error) {
      return alert(error);
    }
  };
};
