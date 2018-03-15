import React from 'react';
import propTypes from 'prop-types';

const Tab = ({ selectionKey, title, children}) => {
    return (
        <span>{title}</span>
    );
};

Tab.propTypes = {
    title: propTypes.string.isRequired,
    selectionKey: propTypes.number.isRequired
};

export default Tab