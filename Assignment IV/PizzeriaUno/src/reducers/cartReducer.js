import { GET_CART_CONTENTS, ADD_TO_CART, REMOVE_FROM_CART, REPLACE_CART } from '../constants/cartConstants';

const cartReducer = (state = [], action) => {
    switch(action.type) {
        case GET_CART_CONTENTS: return action.payload;
        case ADD_TO_CART: return action.payload;
        case REMOVE_FROM_CART: return action.payload;
        case REPLACE_CART: return action.payload;
        default: return state;
    }
}

export default cartReducer;