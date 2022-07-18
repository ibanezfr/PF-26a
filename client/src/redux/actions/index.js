import axios from "axios"
export const FETCH_TICKETS= 'FETCH_TICKETS'
export const FETCH_MATCHES = 'FETCH_MATCHES';

export function fetchTickets() {
    return function (dispatch) {
        axios.get('http://localhost:3001/tickets')
            .then((ticket) => {
                dispatch({
                    type: FETCH_TICKETS,
                    payload: ticket.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export function fetchMatches(){
    return function (dispatch){
        axios.get('http://localhost:3001/matches')
        .then((match)=>{
            dispatch({
                type: FETCH_MATCHES,
                payload: match.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}