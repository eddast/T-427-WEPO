import React from 'react';
import PropTypes from 'prop-types';
import styles from './tab.css';

const Tab = ({ selectionKey, title, children}) => {
    return (
        <span className={`${styles.tabWrapper}`}>
                <span>{title}</span>
        </span>
    );
};

Tab.PropTypes = {
    title: PropTypes.string.isRequired,
    selectionKey: PropTypes.number.isRequired
};

export default Tab