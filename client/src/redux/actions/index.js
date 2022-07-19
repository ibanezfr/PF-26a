import axios from "axios"
<<<<<<< HEAD
export const FETCH_TICKETS= 'FETCH_TICKETS'
export const FETCH_MATCHES = 'FETCH_MATCHES';

export function fetchTickets() {
=======
export const FETCH_PRODUCTS= 'FETCH_PRODUCTS'
export function fetchProducts() {

>>>>>>> c4cb56703732b3ddc2d784dd5c7de8775ac0f757
    return function (dispatch) {
        axios.get('http://localhost:3001/products')
            .then((product) => {
                console.log(product)
                dispatch({
                    type: FETCH_PRODUCTS,
                    payload: product.data
                   
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