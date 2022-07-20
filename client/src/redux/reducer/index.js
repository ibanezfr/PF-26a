import {
    FETCH_PRODUCTS,
    FETCH_BY_NAME,
    GET_BY_ID,
    CLEAN_PRODUCT
} from "../actions/index";


const initialState ={
    products:[],
    searchProducts:[],
    detail: []/* ,
    displayedProducts:[],
    filters:[] */
    
} 



function rootReducer(state= initialState, action){
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.payload
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


            
             
    
        default:
            return state;
           
    }

}

export default rootReducer;
