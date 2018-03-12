import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.css';

const Button = ({ onClick, children }) => {
    return (
        <div>
            <div onClick={onClick} className={`${styles[`btn-wrapper`]}`}>
                <div className={`${styles[`btn`]}`}></div>
                <a className={`${styles[`btn-href`]}`}>{children}</a>
            </div>
        </div>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node
};

export default Button;