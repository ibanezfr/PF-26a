import axios from "axios"
export const FETCH_PRODUCTS= 'FETCH_PRODUCTS'
export const FETCH_BY_NAME="FETCH_BY_NAME"
export const GET_BY_ID = 'GET_BY_ID';
export const CLEAN_PRODUCT = 'CLEAN_PRODUCT';
export const GET_SIZE = 'GET_SIZE';
const URL_FOR_FETCH_PRODUCTS = "http://localhost:3001/products";
const URL_FOR_FETCH_CATEGORIES='http://localhost:3001/categories'
export const FETCH_CATEGORIES= 'FETCH_CATEGORIES'
export const ADD_FILTER='ADD_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';
export const SET_PRODUCTS_TO_DISPLAY= 'SET_PRODUCTS_TO_DISPLAY'


export function fetchProducts() {

    return function (dispatch) {
        axios.get(URL_FOR_FETCH_PRODUCTS)
            .then((product) => {
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
export function fetchCategories(){
    return function(dispatch){
        axios.get(URL_FOR_FETCH_CATEGORIES)
        .then((categories)=>{
            let formattedCategories = categories.data.map(cat=>cat.name)
            dispatch({
                type: FETCH_CATEGORIES,
                payload: formattedCategories
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}
export function addFilter(filter){

    return function(dispatch){
        dispatch({
            type:ADD_FILTER,
            payload:filter
        })
    }
}

export function removeFilter(filter){
    return function (dispatch){
        dispatch({
            type:REMOVE_FILTER,
            payload:filter
        })
    }
}

export function setProductsToDisplay(products){
    return function(dispatch){
        dispatch({
            type:SET_PRODUCTS_TO_DISPLAY,
            payload: products
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

  export function bringSize(id){
    return async (dispatch) =>{
      let size = await axios.get("http://localhost:3001/products/size/" + id);
      // console.log("en la action: ", size.data)
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
      return dispatch({
        type: FETCH_BY_NAME,
        payload: productsByName.data,
      });
    } catch (error) {
      return alert(error);
    }
  };
};
