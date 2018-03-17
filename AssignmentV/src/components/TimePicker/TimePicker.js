import React from 'react';
import propTypes from 'prop-types';
import styles from './timepicker.css';
import Clock from './Clock';
import FontAwesome from "react-fontawesome";

class TimePicker extends React.Component{
    constructor(props, ctx) {
        super(props,ctx);
        this.state = {
            hour: 10,
            minutes: 10
        }
    }
    render() {
        return (
            <div className={`${styles.wrapper}`}>
                <span className={`${styles.clockwrapper}`}>
                    <Clock hour={this.state.hour} minutes={this.state.minutes} />
                </span>
                <span className={`${styles.timepicker}`}>
                    <div className={`${styles.controlpanel}`}>
                        <FontAwesome className={`${styles.controls}`} aria-hidden='false' name='angle-up' onClick={()=>  this.setState({hour: (this.state.hour+1) % this.props.format})} />
                        <FontAwesome className={`${styles.controls}`} aria-hidden='false' name='angle-up' onClick={()=> this.setState({minutes: (this.state.minutes+1) % 60})} />
                    </div>
                    <span>
                        {this.extrazero(this.state.hour)}{this.state.hour}
                    </span>
                    <span> : </span>
                    <span>
                        {this.extrazero(this.state.minutes)}{this.state.minutes}
                    </span>
                    <div className={`${styles.controlpanel} ${styles.decrement}`}>
                        <FontAwesome className={`${styles.controls}`} aria-hidden='false' name='angle-down' onClick={()=> {if (this.state.hour > 0) this.setState({hour: (this.state.hour-1)}); else this.setState({hour: this.props.format})}} />
                        <FontAwesome className={`${styles.controls}`} aria-hidden='false' name='angle-down' onClick={()=> {if (this.state.minutes > 0) this.setState({minutes: (this.state.minutes-1)}); else this.setState({minutes: 60})}} />
                    </div>
                </span>
            </div>
        );
    }

    extrazero(unit) {
        if(unit < 10) {
            return '0';
        }
        return;
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