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
  CLEAR_CART
} from "../actions/index";

const initialState = {
  products: [],
  detail: [],
  searchProducts: [],
  size: [],
  displayedProducts: [],
  filters: [],
  categories: [],
  user: [],
  userInfo: [],
  session: false,
  cart: [
    ...(JSON.parse(localStorage.getItem('cart')) === null
      ? []
      : JSON.parse(localStorage.getItem('cart'))),
  ]
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
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
      return {
        ...state,
        filters: [...state.filters, action.payload],
      };
    case REMOVE_FILTER:
      return {
        ...state,
        filters: state.filters.filter((fil) => fil !== action.payload),
      };
    case SET_PRODUCTS_TO_DISPLAY:
      return {
        ...state,
        displayedProducts: action.payload,
      };
    case FETCH_BY_NAME:
      if (!action.payload[0]) return alert("Producto no encontrado");
      return {
        ...state,
        searchProducts: action.payload,
      };
    case GET_BY_ID:
      return {
        ...state,
        detail: action.payload,
      };
    case CLEAN_PRODUCT:
      return {
        ...state,
        detail: [],
      };
    case GET_SIZE:
      return {
        ...state,
        size: action.payload,
      };

    case "AUTH":
      return localStorage.setItem(
        "usuario",
        JSON.stringify({ ...action?.data })
      );

    case "LOGOUT":
      localStorage.clear();
      return { ...state };

    case "SESSION":
      return {
        ...state,
        user: action.payload.data,
        session: action.payload.session,
      };

    case ADD_TO_CART:
      let newItem = state.products.find((p) => p.id === action.payload);
      let itemInCart = state.cart.find((item) => item.id === newItem.id);
      return (itemInCart
        ? {
          ...state,
          cart: state.cart.map((item) =>
            item.id === newItem.id
              // && item.stock > newItem.quantity 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
        : {
          ...state,
          cart: [...state.cart, { ...newItem, quantity: 1 }]
        });

    case REMOVE_ONE_FROM_CART:
      let itemToDelete = state.cart.find((item) => item.id === action.payload);
      return itemToDelete.quantity > 1
        ? {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        }
        : {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload)
        };

    case REMOVE_ALL_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload)
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: []
      };

    default:
      return state;
  }
}

export default rootReducer;
