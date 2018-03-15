import React from "react";
// import PropTypes from "prop-types";
import styles from "./col.css";

class Col extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 0
        };
    };

    render () {
        var size;
        if (this.props.size > 0) {  
            size = this.props.size;
        }
        else{
            size = 1;
        }

        var setWidth = 1000/12 * size;
        return <div className={`${styles.column}`} style={{ width: setWidth }} />;

        // const { myProps } = this.props;
        // console.log("myProps equals: " + myProps);

        // return <div></div>
    }
}

export default Col;
