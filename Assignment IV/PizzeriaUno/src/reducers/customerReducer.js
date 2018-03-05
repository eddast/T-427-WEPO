import { GET_CUSTOMER_INFO, SET_CUSTOMER_INFO } from '../constants/customerConstants';

const emptyCustomer = {
    name: 'No one',
    telephone: '12345',
    address: 'Nope',
    city: 'Metrocity',
    postalCode: '298'
}

const cartReducer = (state = emptyCustomer, action) => {
    switch(action.type) {
        case GET_CUSTOMER_INFO: return action.payload;
        case SET_CUSTOMER_INFO: return action.payload;
        default: return state;
    }
}

export default cartReducer;