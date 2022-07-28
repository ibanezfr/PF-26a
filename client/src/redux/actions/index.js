import axios from "axios";
export const GET_BY_ID = "GET_BY_ID";
export const CLEAN_PRODUCT = "CLEAN_PRODUCT";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_BY_NAME = "FETCH_BY_NAME";
export const GET_SIZE = "GET_SIZE";
export const POST_PRDUCT = "POST_PRODUCT";

//carrito de compras
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";
export const REMOVE_ALL_FROM_CART = "REMOVE_ALL_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";

const URL_FOR_POST_PRODUCT = "http://localhost:3001/products/create";
const URL_FOR_FETCH_PRODUCTS = "http://localhost:3001/products";
const URL_FOR_FETCH_CATEGORIES = "http://localhost:3001/categories";
const URL_FOR_GET_PRODUCTS_BY_ID = "http://localhost:3001/products/";
const URL_FOR_BRING_SIZE = "http://localhost:3001/products/size/";
const URL_FOR_GET_PRODUCTS_BY_NAME = "http://localhost:3001/products/search?name="

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const ADD_FILTER = "ADD_FILTER";
export const REMOVE_FILTER = "REMOVE_FILTER";
export const SET_PRODUCTS_TO_DISPLAY = "SET_PRODUCTS_TO_DISPLAY";
export const SET_ORDER = "SET_ORDER";
export const SET_SEARCH_STATUS = 'SET_SEARCH_STatus';
export const RESET_FILTER_ORDER = 'RESET_FILTER_ORDER';

export const SESSION = "SESSION"
/*
case CREATE_RECIPE:
            return {
                ...state
            };
export const createRecipe = (recipe) => {   
    
    return async function (dispatch) {
        try {
            const response = await axios.post("http://localhost:3001/recipes", recipe);
            return dispatch({
                type: CREATE_RECIPE, payload: response.data
            });
        } catch (error) {
            return alert(error.response.data.error);
        }
    };
};
*/
export const postProduct = (payload) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(URL_FOR_POST_PRODUCT, payload)
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

//carrito de compras FUNCIONES
export function addToCart(id) {
  return {
    type: ADD_TO_CART,
    payload: id,
  };
}

export function clearCart() {
  return {
    type: CLEAR_CART,
  };
}

export function deleteFromCart(id, all = false) {
  if (all) {
    return {
      type: REMOVE_ALL_FROM_CART,
      payload: id,
    };
  } else {
    return {
      type: REMOVE_ONE_FROM_CART,
      payload: id,
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
      payload: status
    })
  }
}

export function resetFilterOrder() {
  return function (dispatch) {
    dispatch({
      type: RESET_FILTER_ORDER,
    })
  }
}
