import React from "react";
// import PropTypes from "prop-types";
import styles from "./tab.css";

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // console.log("Props equals: " + JSON.stringify(this.props));

    var cssName;
    if (this.props.selectionKey === 3){
        cssName = styles.currentTab;
    }
    else{
        cssName = styles.containerForEachTab;
    }

    return <div className={`${cssName}`}>
        <p className={`${styles.headerText}`}>{this.props.title}</p>
      </div>;
  }
}

export default Tab;
