import {
  FETCH_PRODUCTS,
  GET_BY_ID,
  CLEAN_PRODUCT,
  FETCH_BY_NAME,
  GET_SIZE,
  FETCH_CATEGORIES,
  ADD_FILTER,
  REMOVE_FILTER,
  SET_PRODUCTS_TO_DISPLAY,
  ADD_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  SET_ORDER,
  // SESSION,
  SET_SEARCH_STATUS,
  RESET_FILTER_ORDER,
  ADD_ONE_FROM_CART,
  POST_PRDUCT,
  GET_Q_AND_A,
  GET_INFO_Q_AND_A,
  GET_ANSWERS
} from "../actions/index";
import { filterCart, filterProducts } from "../../Utils";
import { orderProducts } from "../../Utils";

const initialState = {
  products: [],
  detail: {},
  searchProducts: [],
  size: [],
  displayedProducts: [], //los productos que se van mostrando de acuerdo a los filtros
  filters: [
    ...(JSON.parse(localStorage.getItem("filter")) === null
      ? []
      : JSON.parse(localStorage.getItem("filter"))),
  ],
  categories: [],
  orderBy: (JSON.parse(localStorage.getItem("order")) === null
    ? ''
    : JSON.parse(localStorage.getItem("order"))),
  user: [],
  userInfo: [],
  session: false,
  cart: [
    ...(JSON.parse(localStorage.getItem("cart")) === null
      ? []
      : JSON.parse(localStorage.getItem("cart"))),
  ],
  question: [],
  infoQuestion: [],
  infoAnswer: [],
  isSearchActive: false,
};


function rootReducer(state = initialState, action) {
  switch (action.type) {
    case POST_PRDUCT:
      return {
        ...state,
      };
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        displayedProducts: action.payload,
      };
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case ADD_FILTER:
      var aux = [...state.filters, action.payload];
      var producto = filterProducts(state.products, aux);
      return {
        ...state,
        filters: aux,
        displayedProducts: producto,
      };
    case REMOVE_FILTER:
      var auxs = state.filters.filter((fil) => fil !== action.payload);
      var producto2 = filterProducts(state.products, auxs)
      return {
        ...state,
        filters: auxs,
        displayedProducts: producto2
      };
    case SET_PRODUCTS_TO_DISPLAY:
      return {
        ...state,
        // displayedProducts: action.payload,
      };
    case FETCH_BY_NAME:
      return {
        ...state,
        searchProducts: action.payload,
        displayedProducts: action.payload, //edite agus
      };
    case GET_BY_ID:
      return {
        ...state,
        detail: action.payload,
      };
    case CLEAN_PRODUCT:
      return {
        ...state,
        detail: {},
      };
    case GET_SIZE:
      return {
        ...state,
        size: action.payload,
      };

    // case "LOGOUT":
    //   localStorage.clear();
    //   return { ...state };

    case "FETCH_USERS": {
      return {
        ...state,
        user: action.payload,
      };
    }

    case "SESSION":
      return {
        ...state,
        user: action.payload.data,
        session: action.payload.session,
      };

    case ADD_TO_CART:
      let itemInCart = state.cart.find((item) => item.id === action.payload.id && item.size === action.payload.size);
      
    
      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              (item.id === action.payload.id && item.size === action.payload.size)
                ?  {...item, quantity: action.payload.quantity}
                : item
            )
          }
        : {
          ...state,
          cart: [...state.cart, { ...action.payload }],
        };

    case REMOVE_ONE_FROM_CART:
      let itemToDelete = state.cart.find((item) => item.id === action.payload.id && item.size === action.payload.size);
      return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload.id && item.size === action.payload.size
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
          }
        : {
            ...state,
            cart: state.cart.filter((item) => filterCart(item, itemToDelete)),
          };

    case ADD_ONE_FROM_CART:
      let productAdd = state.cart.find((item) => item.id === action.payload.id && item.size === action.payload.size);
      if  (productAdd.quantity === productAdd.stock) {
        alert("limite alcanzado")
        return {...state}
      }
      return {
        ...state,
        cart: state.cart.map((item) =>
        item.id === action.payload.id && item.size === action.payload.size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      }

    case REMOVE_FROM_CART:
      let indexRemove = state.cart.findIndex((item) => item.id === action.payload.id && item.size === action.payload.size);
      state.cart.splice(indexRemove,1);
      
      return {
        ...state,
        cart: [...state.cart]
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    case SET_ORDER:
      let prod = state.displayedProducts;
      if (state.isSearchActive) {
        prod = state.searchProducts;
      }

      prod = orderProducts(prod, action.payload); //quiero ordenar lo que se ve

      return {
        ...state,
        orderBy: action.payload,
        displayedProducts: prod,
      };
    case SET_SEARCH_STATUS:
      return {
        ...state,
        isSearchActive: action.payload,
      };
    case RESET_FILTER_ORDER:
      return {
        ...state,
        filters: [],
        orderBy: ''
      }

    case GET_Q_AND_A: 
    return{
      ...state,
      question: action.payload
    }

    case GET_INFO_Q_AND_A:
      return{
        ...state,
        infoQuestion: action.payload
      }
    
    case GET_ANSWERS:
      return{
        ...state,
        infoAnswer: action.payload
      }
    default:
      return state;
  }
}

export default rootReducer;
