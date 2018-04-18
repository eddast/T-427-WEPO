import React from 'react';
import propTypes from 'prop-types';

// Dummy component: renders a text input box with given labels, value, type etc plus onclick and validation functionality
const EmployeeListItem = ({ employee, onClick }) => {
    return (
        <li onClick={onClick}>
            <img style={{width: '50px', height:'50px'}} src={employee.image} alt={employee.name}/>
            {employee.name}
            {employee.id}
        </li>
    );
};

// Variables TextInput needs provided
EmployeeListItem.propTypes = {

    /* Label for input box, displayed to the right of input box*/
    employee: propTypes.any.isRequired,
}

export default EmployeeListItem;