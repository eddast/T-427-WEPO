import { GET_ALL_OFFERS, GET_OFFER_BY_ID } from '../constants/offerConstants';

const pizzaReducer = (state = [], action) => {
    switch(action.type) {
        case GET_ALL_OFFERS: return action.payload;
        case GET_OFFER_BY_ID: return action.payload;
        default: return state;
    }
}

export default pizzaReducer;