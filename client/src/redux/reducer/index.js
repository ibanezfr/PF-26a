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
  REMOVE_ALL_FROM_CART,
  CLEAR_CART,
  SET_ORDER,
  SESSION,
  SET_SEARCH_STATUS,
  RESET_FILTER_ORDER,
  POST_PRDUCT,
} from "../actions/index";
import { filterProducts } from "../../Utils";
import { orderProducts } from "../../Utils";

const initialState = {
  products: [], //siempre tengo todos los productos para filtrar 
  detail: [],
  searchProducts: [],
  size: [],
  displayedProducts: [],//los productos que se van mostrando de acuerdo a los filtros
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
  isSearchActive: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case POST_PRDUCT:
      return {
        ...state,
      }
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
        displayedProducts: producto
      };
    case REMOVE_FILTER:
      var auxs = state.filters.filter((fil) => fil !== action.payload);
      var producto = filterProducts(state.products, auxs)
      return {
        ...state,
        filters: auxs,
        displayedProducts: producto
      };
    case SET_PRODUCTS_TO_DISPLAY:
      return {
        ...state,
        // displayedProducts: action.payload,
      };
    case FETCH_BY_NAME:
      if (!action.payload[0]) alert("Producto no encontrado");
      return {
        ...state,
        searchProducts: action.payload,
        displayedProducts: action.payload//edite agus
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
        users: action.payload,
      };
    }

    case SESSION:
      return {
        ...state,
        user: action.payload.data,
        session: action.payload.session,
      };

    case ADD_TO_CART: // {na...}
      // let newItem = state.products.find((p) => p.id === action.payload.id);
      let itemInCart = state.cart.find((item) => item.id === action.payload.id);
      // if (
      //   itemInCart !== undefined &&
      //   itemInCart.quantity === itemInCart.stock
      // ) {
      //   alert("Limite de producto alcanzado");
      //   return state;
      // }
      return itemInCart
        ? {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id && item.size === action.payload.size
              ? item.quantity = action.payload.quantity
              : item
          ),
        }
        : {
          ...state,
          cart: [...state.cart, { ...action.payload }],
        };

    case REMOVE_ONE_FROM_CART:
      let itemToDelete = state.cart.find((item) => item.id === action.payload);
      return itemToDelete.quantity > 1
        ? {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        }
        : {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload),
        };

    case REMOVE_ALL_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    case SET_ORDER:
      let prod = state.displayedProducts
      if (state.isSearchActive) { prod = state.searchProducts }

      prod = orderProducts(prod, action.payload)//quiero ordenar lo que se ve

      return {
        ...state,
        orderBy: action.payload,
        displayedProducts: prod,
      };
    case SET_SEARCH_STATUS:
      return {
        ...state,
        isSearchActive: action.payload
      }
    case RESET_FILTER_ORDER:
      return {
        ...state,
        filters: [],
        orderBy: ''
      }
    default:
      return state;
  }
}


export default rootReducer;
