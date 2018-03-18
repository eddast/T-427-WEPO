import React from 'react';
import propTypes from 'prop-types';
import styles from './glowbox.css';
import FontAwesome from "react-fontawesome";

const GlowBox = ({onClick, icon, children, modal}) => {
        return (
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.content}`} onClick={()=> onClick()}>
                    <FontAwesome className={`${styles.icon}`} aria-hidden='false' name={icon} />
                    {children}
                </div>
                {modal}
            </div>
        );
};

GlowBox.propTypes = {
    onClick: propTypes.func.isRequired,
    icon: propTypes.string.isRequired
};

GlowBox.defaultProps = {
    modal: ''
};

export default GlowBox