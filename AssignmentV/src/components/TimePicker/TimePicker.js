import React from "react";
import styles from "./timepicker.css";

class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
        time: null,
        format: 0 
    };
  }


  handleClick(){
      console.log("Woop woop, I just pressed some stuff");
      this.setState({ time: 'someTime' });
  }

  render() {
    // console.log(this.props);

    if (this.props.format === 24){
        return <div className={`${styles.container24}`} onClick={this.handleClick}>
        
        </div>;
    }
    else if (this.props.format === 12){
        return <div className={`${styles.container12}`} onClick={this.handleClick}>

        </div>;
    }
    else{
        return <div>Wrong time format put in, only 24 and 12 are allowed</div>
    }
    
  }
}

//In case we want to use this later on
// TimePicker.propTypes = {
//   images: PropTypes.array.isRequired,
//   size: PropTypes.string.isRequired
// };

export default TimePicker;