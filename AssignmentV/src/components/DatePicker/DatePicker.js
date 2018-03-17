import React from "react";
// import styles from "./datepicker.css";

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      date: null,
      locale: null
    };
  }

  handleClick() {
    this.setState({ date: "someDate" });
  }

  render() {
    return <div>I want to make a date picker here</div>
  }
}

//In case we want to use this later on
// DatePicker.propTypes = {
//   images: PropTypes.array.isRequired,
//   size: PropTypes.string.isRequired
// };

export default DatePicker;
