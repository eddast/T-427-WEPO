import React from 'react';
import propTypes from 'prop-types';
import GlowBox from '../GlowBox/GlowBox';
import DatePickerInterface from './DatePickerInterface';
import FontAwesome from "react-fontawesome";

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
                    onClick={()=> this.setState({showPicker: true})}
                    icon='calendar'
                >
                        <span>{this.state.date}</span>
                </GlowBox>
                {
                  this.state.showPicker===true?
                  <DatePickerInterface 
                    onDatePick={(date) =>
                      { console.log(date)
                        this.props.onDatePick(date);
                      this.setState({date: date})}}
                    locale={this.props.locale}
                  /> :
                  ''
                }
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