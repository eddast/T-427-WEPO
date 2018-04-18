import { GET_ALL_EMPLOYEES, GET_EMPLOYEE_BY_NAME } from '../constants/employeeConstants';

const employeeReducer = (state = [], action) => {
    switch (action.type) {
        case GET_ALL_EMPLOYEES: return action.payload;
        case GET_EMPLOYEE_BY_NAME: return action.payload;
        default: return state;
    }
}

export default employeeReducer;