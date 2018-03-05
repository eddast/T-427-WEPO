import { GET_ORDER_BY_TELEPHONE, POST_ORDER_BY_TELEPHONE } from '../constants/orderConstants';

const orderReducer = (state=null, action) => {
    switch (action.type) {
        case GET_ORDER_BY_TELEPHONE: return action.payload;
        case POST_ORDER_BY_TELEPHONE: return action.payload;
        default: return state;
    }
}

export default orderReducer;