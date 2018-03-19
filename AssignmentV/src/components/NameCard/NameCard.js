import React from 'react';
import PropTypes from 'prop-types';
import styles from './namecard.css';
import FontAwesome from 'react-fontawesome';

/**
 * Renders customized name card with user info provided,
 * takes in name, email, telephone and image url to render appropriate info
 */
const NameCard = ({ name, email, telephone, imageUrl }) => {
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.profilepic}`} style={{ backgroundImage: `url(${imageUrl})`}}>&nbsp;</div>
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.info}`}>
                    <p className={`${styles.name}`}>
                        {name}
                    </p>
                    <div className={`${styles.email}`}>
                        <span className={`${styles.icon}`}><FontAwesome aria-hidden='false' name='envelope'/></span>
                        {email}
                    </div>
                    <div className={`${styles.telephone}`}>
                        <span className={`${styles.icon}`}><FontAwesome aria-hidden='false' name='phone'/></span>
                        {telephone}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Props namecard needs to function
NameCard.propTypes = {
    /* user information displayed on name card */
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    telephone: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
};

export default NameCard;