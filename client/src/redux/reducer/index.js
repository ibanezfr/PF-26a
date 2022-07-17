import {
    FETCH_TICKETS
} from "../actions/index";
const initialState ={
  tickets:[]
  
}



function rootReducer(state= initialState, action){
    switch (action.type) {
        case FETCH_TICKETS:
            return {
                ...state,
              tickets: action.payload
            }


            
    
        default:
            return state;
           
    }

}

export default rootReducer;