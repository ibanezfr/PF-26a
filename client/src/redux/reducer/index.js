import {
<<<<<<< HEAD
    FETCH_TICKETS,
    FETCH_MATCHES
} from "../actions/index";
const initialState ={
  tickets:[],
  matches: []
=======
    FETCH_PRODUCTS
} from "../actions/index";
const initialState ={
    products:[]
  
>>>>>>> c4cb56703732b3ddc2d784dd5c7de8775ac0f757
}

function rootReducer(state= initialState, action){
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case FETCH_MATCHES:
            return{
                ...state,
                matches: action.payload
            }


            
    
        default:
            return state;
           
    }

}

export default rootReducer;