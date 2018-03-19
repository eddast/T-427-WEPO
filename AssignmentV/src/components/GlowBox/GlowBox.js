import React from 'react';
import propTypes from 'prop-types';
import styles from './glowbox.css';
import FontAwesome from "react-fontawesome";

/**
 * Renders a glowing input-like box with an onClick function
 * Has an icon to the right which hints user as to what that functionality is  
 */
const GlowBox = ({onClick, icon, children}) => {
        return (
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.content}`} onClick={()=> onClick()}>
                    <FontAwesome className={`${styles.icon}`} aria-hidden='false' name={icon} />
                    {children}
                </div>
            </div>
        );
};

// Props glowbox needs to function
GlowBox.propTypes = {
    /* Onclick action once box is clicked */
    onClick: propTypes.func.isRequired,
    /* Icon hinting user which action is taken on click */
    icon: propTypes.string.isRequired
};


export default GlowBox