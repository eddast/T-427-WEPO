import React from 'react';
import propTypes from 'prop-types';
import styles from './timepickervisual.css';
import Clock from './Clock';
import FontAwesome from "react-fontawesome";
import Modal from '../Modal/Modal';

class TimePickerVisual extends React.Component{
    constructor(props, ctx) {
        super(props,ctx);
        this.state = {
            hour: this.props.format===12?12:0,
            minutes: 0,
            time: '',
            am: true
        }
    }
    render() {
        let Time = this.extrazero(this.state.hour) + this.state.hour + ':' + this.extrazero(this.state.minutes) + this.state.minutes;
        return (
            <Modal
                isOpen={this.props.show}
                onClose={() => this.props.closePicker(this.state.time+(this.props.format===12?(this.state.am?' AM':' PM'):''), this.state.am)}
            >
            <Modal.Title>Pick a Time</Modal.Title>
            <Modal.Body>
            <div className={`${styles.wrapper}`}>
                <span className={`${styles.clockwrapper}`}>
                    <span className={`${styles.clock}`}>
                        <Clock hour={this.state.hour} minutes={this.state.minutes} />
                    </span>
                </span>
                <span className={`${styles.timepicker}`}>
                    <div className={`${styles.controlpanel}`}>
                        <FontAwesome className={`${styles.controls}`} aria-hidden='false' name='angle-up' onClick={() => this.incrementHours()} />
                        <FontAwesome className={`${styles.controls}`} aria-hidden='false' name='angle-up' onClick={()=> {this.setState({minutes: (this.state.minutes+1) % 59})}} />
                    </div>
                        {Time}
                        <span className={`${styles.ampm}`}>{this.props.format === 12 ? ' ' + (this.state.am===true?'AM':'PM') : ''}</span>
                    <div className={`${styles.controlpanel} ${styles.decrement}`}>
                        <FontAwesome className={`${styles.controls}`} aria-hidden='false' name='angle-down' onClick={()=> {if (this.state.hour > 0) this.setState({hour: (this.state.hour-1)}); else this.setState({hour: this.props.format-1})}} />
                        <FontAwesome className={`${styles.controls}`} aria-hidden='false' name='angle-down' onClick={()=> {if (this.state.minutes > 0) this.setState({minutes: (this.state.minutes-1)}); else this.setState({minutes: 59})}} />
                    </div>
                </span>
            </div>
            {this.onChangeTime(Time)}
            </Modal.Body>
            </Modal>
        );
    }

    incrementHours() {
        if(this.props.format===12 && this.state.hour+1===12) {
                this.setState({hour: 12, am: !this.state.am});
                return;
        } 

        this.setState({hour: (this.state.hour+1) % (this.props.format)})
    }

    extrazero(unit) {
        if (unit < 10) { return '0'; }
        else return '';
    }

    onChangeTime(time) {
        this.state.time = time;
    }
};

TimePickerVisual.propTypes = {
    closePicker: propTypes.func.isRequired,
    show: propTypes.bool.isRequired,
    format: propTypes.oneOf([24, 12])
};

TimePickerVisual.defaultProps = {
    format: 24
};

export default TimePickerVisual;