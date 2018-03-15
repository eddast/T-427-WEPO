import React from "react";
// import PropTypes from "prop-types";
import styles from "./tabs.css";

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1
    };
  }

  render() {
    var theme = this.props.theme;
    var layout = this.props.layout;
    var selected = this.props.onSelect;
    var currentlySelected = this.props.currentSelectedTab;


    var tabCSSName, containerName, showTheRest;
    var displayCorrectly = false;
    if (theme === "dark" && layout === "horizontal"){
      tabCSSName = styles.tabsInHereDarkLayoutHorizontal;
      containerName = styles.containerForHorizontal;
      showTheRest = styles.showTheRestHorizontal;
      displayCorrectly = true;
    }
    else if (theme === "dark" && layout === "vertical"){
      tabCSSName = styles.tabsInHereDarkLayoutVertical;
      containerName = styles.containerForVertical;
      showTheRest = styles.showTheRestVertical;
      displayCorrectly = true;
    }
    else if (theme === "light" && layout === "horizontal"){
      tabCSSName = styles.tabsInHereLightLayoutHorizontal;
      containerName = styles.containerForHorizontal;
      showTheRest = styles.showTheRestHorizontal;
      displayCorrectly = true;
    }
    else if (theme === "light" && layout === "vertical"){
      tabCSSName = styles.tabsInHereLightLayoutVertical;
      containerName = styles.containerForVertical;
      showTheRest = styles.showTheRestVertical;
      displayCorrectly = true;
    }

    if (displayCorrectly === true){
      return <div className={`${containerName}`}>
          <div className={`${tabCSSName}`}>{this.props.children}</div>
          <div className={`${showTheRest}`}>
            <p>What up???</p>
            <p>Not much. Just testing some stuff out</p>
            <p>What up</p>
            <p>What up</p>
            <p>What up</p>
            <p>What up</p>
            <p>What up</p>
            <p>What up</p>
            <p>What up</p>
            <p>What up</p>
            <p>What up</p>
            <p>What up</p>
          </div>
        </div>;
    }
    else{
      return <div className={`${styles.containerForHorizontal}`}>
        We need to fix the default settings for theme and layout 
      </div>
    }
    
  }
}

//In case we want to use this later on
// Tabs.propTypes = {
//   images: PropTypes.array.isRequired,
//   size: PropTypes.string.isRequired
// };

export default Tabs;
