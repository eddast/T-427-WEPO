import React from 'react';
import propTypes from 'prop-types';
import GlowBox from '../GlowBox/GlowBox';
import DatePickerInterface from './DatePickerInterface';

/**
 * Contains a pseudo-input box (GlowBox component) to show user-inputted date
 * Once glowbox is clicked, the datepicker interface component appears, prompting
 * user to choose his or her date
 */
class DatePicker extends React.Component{

    constructor(props, ctx) {
      super(props,ctx);
      this.state = { showPicker: false, date: "Pick Date"};
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

// PropTypes datepicker needs to function
DatePicker.propTypes = {
    /* Action when user has inputted date; takes in date string as parameter */
    onDatePick: propTypes.func.isRequired,
    /* Specifies which format user wants string, defaults to is-IS (Icelandic date format)*/
    locale: propTypes.string
};

// Default props in case not provided
DatePicker.defaultProps = {
    locale: 'is-IS'
};

export default DatePicker;