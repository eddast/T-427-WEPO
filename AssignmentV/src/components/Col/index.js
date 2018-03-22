import React from "react";

/**
 * A single column within Row component
 * 12 size-unit columns make up a full row
 * (i.e. a single column with size 12 is a full row and
 * two of size six are full row as well)
 */
const Col = ({ size, children }) => {
    const colWidth = 100/12 * size + '%';
    return <span style={{ width: colWidth, minHeight: '100%' }}>{children}</span>;
}

// Col needs to take in size, but size needs to be
// in specific range or an error is raised
Col.propTypes = {
    size: (props, propName) => {
        const prop = props[propName];
        if (prop >= 1 && prop <= 12) { return; }
        return new Error('Column size should be between 1 and 12');
    }
};

// Col default props in case not provided
Col.defaultProps = {
    size: 1
};

export default Col;
