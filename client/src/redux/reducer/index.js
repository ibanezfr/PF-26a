import {
    FETCH_PRODUCTS,
    GET_BY_ID,
    CLEAN_PRODUCT,
    FETCH_BY_NAME,
    GET_SIZE,
    ADD_TO_CART
} from "../actions/index";


const initialState ={
    products:[],
    detail: [], 
    // products:[],
    searchProducts:[],
    size:[],
    cartProduct:[]
}




function rootReducer(state= initialState, action){
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.payload
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

        case FETCH_BY_NAME:
            return {
                ...state,
                searchProducts: action.payload
            }
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
