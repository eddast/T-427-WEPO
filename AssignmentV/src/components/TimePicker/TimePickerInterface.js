import React from 'react';
import propTypes from 'prop-types';
import styles from './timepickerinterface.css';
import Clock from './Clock';
import FontAwesome from "react-fontawesome";
import Button from '../Button/Button';

class TimePickerInterface extends React.Component{
    constructor(props, ctx) {
        super(props,ctx);
        this.state = {
            hour: this.props.format===12?12:0,
            minutes: 0,
            time: '',
            am: true,
            isInputtingHours: false,
            isInputtingMinutes: false,
            isInputtingAM: false,
            hoursInput: 0,
            minutesInput: 0
        }
    }
    render() {
        
        if(!this.props.show) { return <div />;}

        let Time = this.extrazero(this.state.hour) + this.state.hour + ':' + this.extrazero(this.state.minutes) + this.state.minutes;
        return (
            <div>
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
                            <span className={`${styles.hours}`} onClick={() => this.setState({isInputtingHours: true})}>{this.getHours()}</span>
                            <span>:</span>
                            <span className={`${styles.minutes}`} onClick={() => this.setState({isInputtingMinutes: true})}>{this.getMinutes()}</span>
                            <span onClick={() => this.setState({isInputtingAM: true})} className={`${styles.ampm}`}>{this.getAMIdentifier()}</span>
                        <div className={`${styles.controlpanel} ${styles.decrement}`}>
                            <FontAwesome className={`${styles.controls}`} aria-hidden='false' name='angle-down' onClick={()=> this.decrementHours()} />
                            <FontAwesome className={`${styles.controls}`} aria-hidden='false' name='angle-down' onClick={()=> {if (this.state.minutes > 0) this.setState({minutes: (this.state.minutes-1)}); else this.setState({minutes: 59})}} />
                        </div>
                    </span>
                    <div className={`${styles.center}`}>
                        <Button onClick={() => this.props.closePicker(this.state.time+(this.props.format===12?(this.state.am?' AM':' PM'):''), this.state.am)}>CHOOSE THIS TIME</Button>
                    </div>
                </div>
                {this.onChangeTime(Time)}
            </div>
        );
    }

    getHours() {
        if(this.state.isInputtingHours) {
            return <input
                        type="number"
                        autoFocus
                        className={`${styles.input}`}
                        onChange={(e) => this.setState({hoursInput: e.target.value})}
                        onKeyDown={(e) => e.which===13 ? this.changeHoursValue(e): () => {}}
                    />
        }

        return this.extrazero(this.state.hour) + this.state.hour
    }
    getMinutes() {
        if(this.state.isInputtingMinutes) {
            return <input
                        type="number"
                        autoFocus
                        className={`${styles.input}`}
                        onChange={(e) => this.setState({minutesInput: e.target.value})}
                        onKeyDown={(e) => e.which===13 ? this.changeMinutesValue(e): () => {}}
                    />
        }
        return this.extrazero(this.state.minutes) + this.state.minutes
    }
    getAMIdentifier() {

        const AM = this.state.am === true;

        if(this.state.isInputtingAM) {
            return (
                <select
                    className={`${styles.dropdown}`}
                    onChange={(e) => this.setState({isInputtingAM: false, am: e.target.value==='true'?true:false})}
                    name="ampm"
                    defaultValue={1}
                >
                    <option disabled key={1} value={1}>---</option>
                    <option value={true}>AM</option>
                    <option value={false}>PM</option>
                </select>
            );
        }

        if(this.props.format === 12 && AM===true)           { return ' AM'; }
        else if (this.props.format === 12 && AM===false)    { return ' PM'; }
        else                                                { return ''; }
    }
    changeMinutesValue(e) {
        const changedVal = parseInt(e.target.value, 10);
        this.setState({isInputtingMinutes: false});
        if(changedVal >= 0 && changedVal < 60) {
            this.setState({minutes: changedVal});
        } else {
            this.setState({minutes: 0});
        }
    }
    changeHoursValue(e) {
        const changedVal = parseInt(e.target.value, 10);
        this.setState({isInputtingHours: false});
        if(this.props.format === 12) {
            if(changedVal > 0 && changedVal <= 12) {
                this.setState({hour: changedVal});
            } else {
                this.setState({hour: 12});
            }
        } else if (this.props.format === 24) {
            if(changedVal >= 0 && changedVal < 24) {
                this.setState({hour: changedVal});
            } else {
                this.setState({hour: 0});
            }
        }
    }
    incrementHours() {
        if(this.props.format===12 && this.state.hour+1===12) {
                this.setState({hour: 12, am: !this.state.am});
                return;
        } 

        this.setState({hour: (this.state.hour+1) % (this.props.format)})
    }

    decrementHours() {
        if(this.props.format===12 && this.state.hour===12) {
            this.setState({am: !this.state.am});
        }

        if (this.state.hour > 0) {
            this.setState({hour: (this.state.hour-1)});
        } else {
            this.setState({hour: this.props.format-1});
        }
    }

    extrazero(unit) {
        if (unit < 10) { return '0'; }
        else return '';
    }

    onChangeTime(time) {
        this.state.time = time;
    }
};

TimePickerInterface.propTypes = {
    closePicker: propTypes.func.isRequired,
    show: propTypes.bool.isRequired,
    format: propTypes.oneOf([24, 12])
};

TimePickerInterface.defaultProps = {
    format: 24
};

export default TimePickerInterface;