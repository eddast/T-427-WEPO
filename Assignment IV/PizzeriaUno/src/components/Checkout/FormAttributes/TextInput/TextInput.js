import React from 'react';
import propTypes from 'prop-types';

// Dummy component: renders a text input box with given labels, value, type etc plus onclick and validation functionality
const TextInput = ({ label, onChange, name, value, type, validate }) => {
    return (
        <div className="row">
            <label className='formsForDeliveryAndPickUp col-md-offset-3 col-md-2'>
                {label}
            </label>
            <div className="col-md-4">
                <input className="form-control"
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            </div>
            <div className="col-md-3">
                <span className="formErrorText">{validate(value)}</span>
            </div>
        </div>
    );
};

// Variables TextInput needs provided
TextInput.propTypes = {

    /* Label for input box, displayed to the right of input box*/
    label: propTypes.string.isRequired,

    /* Function that handles onChange functionality for input box */
    onChange: propTypes.func.isRequired,

    /* Name attribute of input box */
    name: propTypes.string.isRequired,

    /* Input box value - inner text */
    value: propTypes.string.isRequired,
    
    /* Input box type (text, numeric, etc)*/
    type: propTypes.string,

    /* Validate function, returns string */
    validate: propTypes.func
}

// If no type is provided, use defult type (text)
TextInput.defaultProps = {
    type: 'text'
}

export default TextInput;