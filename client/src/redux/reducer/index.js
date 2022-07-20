import {FETCH_PRODUCTS, FETCH_CATEGORIES,ADD_FILTER} from "../actions/index";

const initialState ={
    products:[],
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

            
    
        default:
            return state;
           
    }

}

export default rootReducer;