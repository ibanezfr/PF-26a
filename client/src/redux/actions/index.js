import axios from "axios";
import { fetch_users_action } from "../../api_url/api_url";
export const GET_BY_ID = "GET_BY_ID";
export const CLEAN_PRODUCT = "CLEAN_PRODUCT";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_BY_NAME = "FETCH_BY_NAME";
export const GET_SIZE = "GET_SIZE";
export const POST_PRDUCT = "POST_PRODUCT";

//carrito de compras
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";
export const ADD_ONE_FROM_CART = "ADD_ONE_FROM_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const GET_INFO_Q_AND_A = 'GET_INFO_Q_AND_A';
export const GET_ANSWERS = 'GET_ANSWERS';

//Q and A
export const GET_Q_AND_A = 'GET_Q_AND_A';

const URL_FOR_POST_PRODUCT = "http://localhost:3001/products/create";
const URL_FOR_FETCH_PRODUCTS = "http://localhost:3001/products";
const URL_FOR_FETCH_CATEGORIES = "http://localhost:3001/categories";
const URL_FOR_GET_PRODUCTS_BY_ID = "http://localhost:3001/products/";
const URL_FOR_BRING_SIZE = "http://localhost:3001/products/size/";
const URL_FOR_GET_PRODUCTS_BY_NAME = "http://localhost:3001/products/search?name="
const URL_QUESTIONS = 'http://localhost:3001/products/q&a/'
const URL_ANSWERS = 'http://localhost:3001/products/answer/'


export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const ADD_FILTER = "ADD_FILTER";
export const REMOVE_FILTER = "REMOVE_FILTER";
export const SET_PRODUCTS_TO_DISPLAY = "SET_PRODUCTS_TO_DISPLAY";
export const SET_ORDER = "SET_ORDER";
export const SET_SEARCH_STATUS = "SET_SEARCH_STatus";
export const RESET_FILTER_ORDER = "RESET_FILTER_ORDER";
export const SESSION = "SESSION";
export const FETCH_CATEGORY= "FETCH_CATEGORY"

export const postProduct = (payload) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(URL_FOR_POST_PRODUCT, payload);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

//QandA
export function getQandA (idProduct, obj){
  return async (dispatch) => {
    let info = await axios.post(URL_QUESTIONS + idProduct, obj);
    // console.log("en la action: ", info.data)
    dispatch({
      type: GET_Q_AND_A,
      payload: info.data,
    });
  };
}

export function bringQandA (id){
  return async (dispatch) => {
    let info = await axios.get(URL_QUESTIONS + id);
    // console.log("en la action: ", info.data)
    dispatch({
      type: GET_INFO_Q_AND_A,
      payload: info.data,
    });
  };
}

export function bringAnswers (id){
  return async (dispatch) => {
    let info = await axios.get(URL_ANSWERS + id);
    // console.log("en la action: ", info.data)
    dispatch({
      type: GET_ANSWERS,
      payload: info.data,
    });
  };
}

export const GET_FAVORITES = "GET_FAVORITES";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
const URL_GET_FAVORITES_FROM_USER = "http://localhost:3001/favs/";
const URL_POST_FAVORITE = "http://localhost:3001/favs/add";
const URL_REMOVE_FAVORITE = "http://localhost:3001/favs/remove/";

//carrito de compras FUNCIONES
export function addToCart(obj) {
  return {
    type: ADD_TO_CART,
    payload: obj,
  };
}

export function clearCart() {
  return {
    type: CLEAR_CART,
  };
}

export function deleteFromCart(data) {
  return {
    type: REMOVE_FROM_CART,
    payload: data,
  };
}
export function changeQuantity(data, boolean) {
  if (boolean) {
    return {
      type: ADD_ONE_FROM_CART,
      payload: data,
    };
  } else {
    return {
      type: REMOVE_ONE_FROM_CART,
      payload: data,
    };
  }
}

export function fetchProducts() {
  return function (dispatch) {
    axios
      .get(URL_FOR_FETCH_PRODUCTS)
      .then((product) => {
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

export function fetchCategories() {
  return function (dispatch) {
    axios
      .get(URL_FOR_FETCH_CATEGORIES)
      .then((categories) => {
        let formattedCategories = categories.data.map((cat) => cat.name);
        dispatch({
          type: FETCH_CATEGORIES,
          payload: formattedCategories,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function fetchCategory() {
  return function (dispatch) {
    axios
      .get(URL_FOR_FETCH_CATEGORIES)
      .then((categories) => {
        
        dispatch({
          type: FETCH_CATEGORY,
          payload: categories.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}


export function addFilter(filter) {
  return function (dispatch) {
    dispatch({
      type: ADD_FILTER,
      payload: filter,
    });
  };
}

export function removeFilter(filter) {
  return function (dispatch) {
    dispatch({
      type: REMOVE_FILTER,
      payload: filter,
    });
  };
}

export function setProductsToDisplay(products) {
  return function (dispatch) {
    dispatch({
      type: SET_PRODUCTS_TO_DISPLAY,
      payload: products,
    });
  };
}

export const getProductsById = (id) => {
  return async (dispatch) => {
    let pedidoApiId = await axios.get(URL_FOR_GET_PRODUCTS_BY_ID + id);
    dispatch({
      type: GET_BY_ID,
      payload: pedidoApiId.data,
    });
  };
};

export function cleanProduct() {
  return {
    type: CLEAN_PRODUCT,
  };
}

export function bringSize(id) {
  return async (dispatch) => {
    let size = await axios.get(URL_FOR_BRING_SIZE + id);
    // console.log("en la action: ", size.data)
    dispatch({
      type: GET_SIZE,
      payload: size.data,
    });
  };
}

export const getProductsByName = (name) => {
  return async (dispatch) => {
    try {
      const productsByName = await axios.get(
        URL_FOR_GET_PRODUCTS_BY_NAME + name
      );

      return dispatch({
        type: FETCH_BY_NAME,
        payload: productsByName.data,
      });
    } catch (error) {
      console.log(error, "||Error||");
    }
  };
};

export const loginCheck = (dispatch) => {
  let isLogged = false;

  let loggedUser = JSON.parse(localStorage.getItem("usuario"));
  if (loggedUser) {
    isLogged = true;
    dispatch({
      type: SESSION,
      payload: { data: loggedUser, session: isLogged },
    });
  } else {
    dispatch({
      type: SESSION,
      payload: { session: isLogged },
    });
  }
};

export function fetchUsers() {
  return async function (dispatch) {
    const result = await axios.get(fetch_users_action);
    return dispatch({ type: "FETCH_USERS", payload: result.data });
  };
}

export function setOrder(order) {
  return function (dispatch) {
    dispatch({
      type: SET_ORDER,
      payload: order,
    });
  };
}

export function setSearchStatus(status) {
  return function (dispatch) {
    dispatch({
      type: SET_SEARCH_STATUS,
      payload: status,
    });
  };
}

export function resetFilterOrder() {
  return function (dispatch) {
    dispatch({
      type: RESET_FILTER_ORDER,
    });
  };
};

export const getFavsFromUser = (id) => {
  return async (dispatch) => {
    let res = await axios.get(URL_GET_FAVORITES_FROM_USER + id);
    dispatch({
      type: GET_FAVORITES,
      payload: res.data.products,
    });
  };
};

export const removeFavsFromUser = (idUser, idProduct) => {
  return async (dispatch) => {
    await axios.delete(URL_REMOVE_FAVORITE +`${idUser}/${idProduct}`);
    dispatch({
      type: REMOVE_FAVORITE,
      payload: idProduct
    });
  };
};

export const addFavsToUser = (data) => {
  return async (dispatch) => {
    let pedido = await axios.post(URL_POST_FAVORITE, data)
    dispatch({
      type:ADD_FAVORITE,
      payload: pedido.data.res.products
    });
  };
};
