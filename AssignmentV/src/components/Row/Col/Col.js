import React from "react";
import PropTypes from "prop-types";
import styles from "./col.css";

const Col = ({size}) => {
    var setWidth = 1000/size;
    console.log("setWidth equals: " + setWidth);
    // var setHeight = size*3;
    // style={{width: setWidth}}

    return <span className={`${styles.column}`} style={{ width: setWidth }} />;
}

Col.propTypes = {   
    size: PropTypes.number.isRequired
}

export default Col;
