import React from 'react';
import propTypes from 'prop-types';
import styles from './timepicker.css';
import Clock from './Clock';

class TimePicker extends React.Component{
    constructor(props, ctx) {
        super(props,ctx);
        this.state = {
            hour: 0,
            minutes: 0
        }
    }
    render() {
        return (
            <div className={`${styles.wrapper}`}>
                <Clock hour={this.state.hour} minutes={this.state.minutes} />
                <span className={`${styles.timepicker}`}>
                    <span>{this.state.hour}</span>
                    <span> : </span>
                    <span>{this.state.minutes}</span>
                </span>
            </div>
        );
    }
};

TimePicker.propTypes = {
    onTimePick: propTypes.func.isRequired,
    format: propTypes.oneOf([24, 12])
};

TimePicker.defaultProps = {
    format: 24
};

export default TimePicker