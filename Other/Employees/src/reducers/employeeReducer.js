import { GET_ALL_EMPLOYEES  } from '../constants/employeeConstants';

const employeeReducer = (state = [], action) => {
    switch (action.type) {
        case GET_ALL_EMPLOYEES: return action.payload;
        default: return state;
    }
}

export default employeeReducer;