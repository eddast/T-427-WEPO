import { GET_ALL_PIZZAS, GET_PIZZA_BY_ID } from '../constants/pizzaConstants';
import fetch from 'isomorphic-fetch';

const getAllPizzas = () => {
    return dispatch => fetch('http://localhost:3500/api/pizzas').then(json => json.json()).then(data => dispatch(getAllPizzaSuccess(data)));
};

const getPizzaByID = (pizzaid) => {
    return dispatch => fetch('http://localhost:3500/api/pizzas/' + pizzaid).then(json => json.json()).then(data => dispatch(getPizzaByIDSuccess(data)));
};

export {
    getAllPizzas,
    getPizzaByID
}

const getAllPizzaSuccess = (pizzas) => {
    return {
        type: GET_ALL_PIZZAS,
        payload: pizzas
    };
};

const getPizzaByIDSuccess = (pizza) => {
    return {
        type: GET_PIZZA_BY_ID,
        payload: pizza
    };
};