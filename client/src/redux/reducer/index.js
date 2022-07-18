import {
    FETCH_TICKETS,
    FETCH_MATCHES
} from "../actions/index";
const initialState ={
  tickets:[],
  matches: []
}



function rootReducer(state= initialState, action){
    switch (action.type) {
        case FETCH_TICKETS:
            return {
                ...state,
              tickets: action.payload
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