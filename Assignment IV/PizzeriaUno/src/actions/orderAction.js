import { GET_ORDER_BY_TELEPHONE, POST_ORDER_BY_TELEPHONE} from '../constants/orderConstants';
import fetch from 'isomorphic-fetch';

const getOrder = (telephone) => {
    return dispatch => fetch('http://localhost:3500/api/orders/' + telephone).then(function(response) {
        if(response.status >= 200 && response.status < 300) {
            response.json().then(data => dispatch(getOrderSuccess(data)));
        } 
    });
};

const postOrder = (telephone, order) => {
    return dispatch => fetch('http://localhost:3500/api/orders/' + telephone, {
        method: 'POST',
        body: JSON.stringify(order),
        headers : {
            'Content-Type' : 'application/json'
        }
    }).then(function(response) {
        if(response.status >= 200 && response.status < 300) {
            () => dispatch(postOrderSuccess());
        } else {
            () => dispatch(postOrderFail());
        }
    });
}

export {
    getOrder,
    postOrder
}

const getOrderSuccess = (order) => {
    return {
        type: GET_ORDER_BY_TELEPHONE,
        payload: order[order.length-1]
    };
};

const postOrderSuccess = () => {
    return {
        type: POST_ORDER_BY_TELEPHONE,
        payload: true
    };
};

const postOrderFail = () => {
    return {
        type: POST_ORDER_BY_TELEPHONE,
        payload: false
    };
};