import React from 'react';
import propTypes from 'prop-types';
import styles from './tab.css';

const Tab = ({ selectionKey, title, children}) => {
    return (
        <span className={`${styles.tabWrapper}`}>
                <span>{title}</span>
        </span>
    );
};

Tab.propTypes = {
    title: propTypes.string.isRequired,
    selectionKey: propTypes.number.isRequired
};

export default Tab