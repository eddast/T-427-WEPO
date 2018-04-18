import React from 'react';
import propTypes from 'prop-types';
import styles from './input.css'

// Dummy component: renders a text input box with given labels, value, type etc plus onclick and validation functionality
const TextInput = ({ label, onChange, name, value, validate, background }) => {
    const valid = validate(value)==='OK'?'valid':'invalid';
    return (
        <div>
            <label>
                {label}
            </label>
            <div>
                <input
                    type='text'
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            </div>
            <div className={`${styles[`${valid}`]} ${background && styles.background}`}>
                <span>{validate(value)}</span>
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

TextInput.defaultProps = {
    background: false
}

export default TextInput;