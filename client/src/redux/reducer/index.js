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
    ADD_TO_CART
} from "../actions/index";


const initialState ={
    products:[],
    detail: [],
    searchProducts:[],
    size:[],
    displayedProducts:[],
    filters:[],
    categories:[]
}

function rootReducer(state= initialState, action){
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                displayedProducts: action.payload
            }
        case FETCH_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case ADD_FILTER:
            return {
                ...state,
                filters: [...state.filters, action.payload]
            }
        case REMOVE_FILTER:
            return{
                ...state,
                filters: state.filters.filter(fil => fil !== action.payload)
            }
        case SET_PRODUCTS_TO_DISPLAY:
            return{
                ...state,
                displayedProducts: action.payload
            }
        case FETCH_BY_NAME:
            if (!action.payload[0]) return alert ('Producto no encontrado');
            return {
                ...state,
                searchProducts: action.payload
            }
        case GET_BY_ID:
            return{
                ...state,
                detail: action.payload
            };
        case CLEAN_PRODUCT:
            return{
                ...state,
                detail: []
            };
        case GET_SIZE:
            return{
                ...state,
                size: action.payload
            }
        case ADD_TO_CART:
            return{
                ...state,
                cartProduct: action.payload
            }

            
             
    
        default:
            return state;
           
    }

}

export default rootReducer;
