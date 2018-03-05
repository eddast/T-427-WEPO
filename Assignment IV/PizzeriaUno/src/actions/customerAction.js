import { GET_CUSTOMER_INFO, SET_CUSTOMER_INFO} from '../constants/customerConstants';

const customerInfoKey = 'customerInformation';

// gets customer info from local storage
const getCustomerInfo = () => {
    var customerInformation = JSON.parse(localStorage.getItem(customerInfoKey));
    return {
        type: GET_CUSTOMER_INFO,
        payload: customerInformation
    };
} 


// Adds customer info to local storage
const setCustomerInfo = (customer) => {
    if(customer.address === undefined) {
        customer.address = '';
    }
    if(customer.city === undefined) {
        customer.city = '';
    }
    if(customer.postalCode === undefined) {
        customer.postalCode = '';
    }
    var data = JSON.stringify(customer);
    localStorage.setItem(customerInfoKey, data);

    return {
        type: SET_CUSTOMER_INFO,
        payload: customer
    };
} 

export {
    getCustomerInfo,
    setCustomerInfo
}