import React from 'react';
import propTypes from 'prop-types';
import TimePickerVisual from "./TimePickerInterface";
import GlowBox from '../GlowBox/GlowBox';

class TimePicker extends React.Component{

    constructor(props, ctx) {
        super(props,ctx);
        this.state = { time: this.props.format + ':00', showPicker: false, am: true};
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
                    <TimePickerVisual
                        show={this.state.showPicker}
                        closePicker={(time, am)=> {this.props.onTimePick(time); this.setState({showPicker: false, time: time, am: am}) }}
                        format={this.props.format}
                    />
                </div>
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