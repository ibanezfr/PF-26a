import { FETCH_PRODUCTS, FETCH_BY_NAME } from "../actions/index";
const initialState = {
  products: [],
  searchProducts: [],
  user: [],
  userInfo: [],
  session: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case FETCH_BY_NAME:
      return {
        ...state,
        searchProducts: action.payload,
      };

    case "AUTH":
      return localStorage.setItem(
        "usuario",
        JSON.stringify({ ...action?.data })
      );

    case "LOGOUT":
      localStorage.removeItem("usuario");
      return { ...state };

    case "SESSION":
      return {
        ...state,
        user: action.payload.data,
        session: action.payload.session,
      };

    default:
      return state;
  }
}

export default rootReducer;
