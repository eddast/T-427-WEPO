import React from 'react';
import propTypes from 'prop-types';

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
                    value={name}
                    onChange={onChange}
                />
            </div>
            <div className="col-md-3">
                <span className="formErrorText">{validate(value)}</span>
            </div>
        </div>
    );
};

TextInput.propTypes = {
    label: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    name: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    type: propTypes.string,
    validate: propTypes.func
}

TextInput.defaultProps = {
    type: 'text'
}

export default TextInput;