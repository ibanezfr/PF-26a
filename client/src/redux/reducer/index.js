import {
    FETCH_PRODUCTS,
    FETCH_BY_NAME
} from "../actions/index";
const initialState ={
    products:[],
    searchProducts:[]/* ,
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

            
             
    
        default:
            return state;
           
    }

}

export default rootReducer;
