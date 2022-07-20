import {
    FETCH_PRODUCTS,
    GET_BY_ID,
    CLEAN_PRODUCT,
    FETCH_BY_NAME
} from "../actions/index";
const initialState ={
    products:[],
    detail: [], 
    products:[],
    searchProducts:[]
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

            
             
    
        default:
            return state;
           
    }

}

export default rootReducer;
