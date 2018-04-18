import { GET_ALL_EMPLOYEES } from '../constants/employeeConstants';
import fetch from 'isomorphic-fetch';

// Adds customer info to local storage
// const getAllEmployees = () => {
//     return dispatch => fetch('http://localhost:3500/api/pizzas').then(json => json.json()).then(data => dispatch(getAllEmployeesSuccess(data)));
// }
const getAllEmployees = () => {
    return {
        type: GET_ALL_EMPLOYEES,
        payload: [
            {
                id: 1,
                name: "Edda Steinunn Rúnarsdóttir",
                image: "https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/27973266_10215227605705301_2849387150595746051_n.jpg?_nc_cat=0&oh=9d977d68871cc7d01d0d488b77de2f8b&oe=5B670839"
            },
            {
                id: 2,
                name: "Sigurður Sturla Bjarnason",
                image: "https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/10405499_867264089950333_3245996106568162073_n.jpg?_nc_cat=0&oh=065fd44494f4875cd3e9ef9b860641e1&oe=5B5D115C"
            },
            {
                id: 3,
                name: "Darri Valgarðsson",
                image: "https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/21231729_10213494063923945_6468131289461243168_n.jpg?_nc_cat=0&oh=b5946bfa729f5ff9aec69cb92ec1d44b&oe=5B6508F5"
            }
        ]
    };
}
 

export {
    getAllEmployees
}

// const getAllEmployeesSuccess = (employees) => {
//     return {
//         type: GET_ALL_EMPLOYEES,
//         payload: employees
//     };
// };