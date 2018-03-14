import React from "react";
import PropTypes from "prop-types";
import styles from "./col.css";

const Col = ({size}) => {
    //Don´t know how to cast size as default 1
    if (size === null) {
        size = 1;
    }
    var setWidth = 1000/12 * size;
    

    return <span className={`${styles.column}`} style={{ width: setWidth }} />;
}

Col.propTypes = {   
    size: PropTypes.number.isRequired
}

export default Col;
