import React from 'react';
import propTypes from 'prop-types';
import GlowBox from '../GlowBox/GlowBox';
import DatePickerInterface from './DatePickerInterface';

class DatePicker extends React.Component{

    constructor(props, ctx) {
      super(props,ctx);
      this.state = {
        showPicker: false,
        date: "Pick Date"
      };
    }

    render() {
        return (
            <div>
                <GlowBox
                    onClick={()=> this.setState({showPicker: !this.state.showPicker})}
                    icon='calendar'
                >
                        <span>{this.state.date}</span>
                </GlowBox>
                <DatePickerInterface 
                  onClose={() => this.setState({showPicker: false})}
                  locale={this.props.locale}
                  visible={this.state.showPicker}
                  onDatePick={(date) =>
                    { this.props.onDatePick(date);
                      this.setState({date: date})}}
                />
            </div>
        );
    }
};

DatePicker.propTypes = {
    onDatePick: propTypes.func.isRequired,
    locale: propTypes.string
};

DatePicker.defaultProps = {
    locale: 'is-IS'
};

export default DatePicker;