import React from 'react';
import propTypes from 'prop-types';
import styles from './timepicker.css';
import FontAwesome from "react-fontawesome";
import TimePickerVisual from "./TimePickerVisual";

class TimePicker extends React.Component{
    constructor(props, ctx) {
        super(props,ctx);
        this.state = { time: this.props.format + ':00', showPicker: false, am: true};
        this.props.format===12?this.state.time = this.state.time+(this.state.am?' AM':' PM'):this.state.time = this.state.time;
    }
    render() {
        return (
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.picker}`} onClick={()=> this.setState({showPicker: true})}>
                    <span>{this.state.time}</span>
                    <FontAwesome className={`${styles.icon}`} aria-hidden='false' name='clock-o' />
                </div>
                <TimePickerVisual
                    show={this.state.showPicker}
                    closePicker={(time, am)=> {this.props.onTimePick(time); this.setState({showPicker: false, time: time, am: am}) }}

                    format={this.props.format}
                />
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