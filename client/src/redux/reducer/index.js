import {FETCH_PRODUCTS, FETCH_CATEGORIES,
    ADD_FILTER, REMOVE_FILTER, SET_PRODUCTS_TO_DISPLAY, FETCH_BY_NAME} from "../actions/index";

const initialState ={
    products:[],
    searchProducts:[],
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
            return {
                ...state,
                searchProducts: action.payload
            }

            
             
    
        default:
            return state;
           
    }

}

export default rootReducer;
