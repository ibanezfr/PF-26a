import {
    FETCH_PRODUCTS,
<<<<<<< HEAD
=======
    FETCH_BY_NAME,
>>>>>>> 5cfd2bd8960ab1e346f208ac514d1b1d2b655842
    GET_BY_ID,
    CLEAN_PRODUCT,
    FETCH_BY_NAME,
    GET_SIZE,
    ADD_TO_CART
} from "../actions/index";


const initialState ={
    products:[],
<<<<<<< HEAD
    detail: [], 
    products:[],
    searchProducts:[],
    size:[],
    cartProduct:[]
}

=======
    searchProducts:[],
    detail: []/* ,
    displayedProducts:[],
    filters:[] */
    
} 
>>>>>>> 5cfd2bd8960ab1e346f208ac514d1b1d2b655842



function rootReducer(state= initialState, action){
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
<<<<<<< HEAD
=======
        case FETCH_BY_NAME:
            if (!action.payload[0]) return alert ('Producto no encontrado');
            return {
                ...state,
                searchProducts: action.payload
            }
>>>>>>> 5cfd2bd8960ab1e346f208ac514d1b1d2b655842
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

<<<<<<< HEAD
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
=======
>>>>>>> 5cfd2bd8960ab1e346f208ac514d1b1d2b655842

            
             
    
        default:
            return state;
           
    }

}

export default rootReducer;
