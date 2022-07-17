import axios from "axios"
export const FETCH_TICKETS= 'FETCH_TICKETS'
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