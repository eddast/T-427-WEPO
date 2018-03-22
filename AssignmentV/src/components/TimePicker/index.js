import React from 'react';
import propTypes from 'prop-types';
import GlowBox from '../GlowBox/GlowBox';
import TimePickerInterface from './TimePickerInterface';

/**
 * Contains a pseudo-input box (GlowBox component) to show user-inputted time
 * Once glowbox is clicked, the time picker interface component appears, prompting
 * user to choose his or her time. Can either take 12H form or military time form via prop 'format'
 */
class TimePicker extends React.Component{

    constructor(props, ctx) {
        super(props,ctx);
        this.state = {
            time: this.props.format===24?'00:00':'12:00',
            showPicker: false,
            am: true
        };
        this.props.format===12?this.state.time = this.state.time+(this.state.am?' AM':' PM'):this.state.time = this.state.time;
    }

    render() {
        return (
            <div>
                <GlowBox
                    onClick={()=> this.setState({showPicker: !this.state.showPicker})}
                    icon='clock-o'
                >
                        <span>{this.state.time}</span>
                </GlowBox>
                <div>
                    <TimePickerInterface
                        show={this.state.showPicker}
                        closePicker={(time, am)=> {this.props.onTimePick(time); this.setState({showPicker: false, time: time, am: am}) }}
                        format={this.props.format}
                    />
                </div>
            </div>
        );
    }

};

// props timepicker needs to function
TimePicker.propTypes = {
    /* Action taken when user inputs time, takes time as parameter */
    onTimePick: propTypes.func.isRequired,
    /* format of timepicker; either military time or 12H format */
    format: propTypes.oneOf([24, 12])
};

// Default props if none are provided
TimePicker.defaultProps = {
    format: 24
};


export default TimePicker;