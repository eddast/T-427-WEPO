import React from "react";

const Col = ({ size, children }) => {
    const colWidth = 100/12 * size + '%';
    return <span style={{ width: colWidth, minHeight: '100%' }}>{children}</span>;
}

Col.propTypes = {
    size: (props, propName) => {
        const prop = props[propName];
        if (prop >= 1 && prop <= 12) { return; }
        return new Error('Column size should be between 1 and 12');
    }
};

export default Col;
