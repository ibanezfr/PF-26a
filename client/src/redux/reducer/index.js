import {
    FETCH_PRODUCTS,
    GET_BY_ID,
    CLEAN_PRODUCT,
    FETCH_BY_NAME,
    GET_SIZE
} from "../actions/index";


const initialState ={
    products:[],
    detail: [], 
    products:[],
    searchProducts:[],
    size:[]
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
        case GET_SIZE:
            return{
                ...state,
                size: action.payload
            }

            
             
    
        default:
            return state;
           
    }

}

export default rootReducer;
