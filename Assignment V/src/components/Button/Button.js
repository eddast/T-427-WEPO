import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.css';

/**
 * Helper component, a pretty button!
 */
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

// Takes in onclick function and
// children (i.e. whatever should be displayed within button)
Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default Button;