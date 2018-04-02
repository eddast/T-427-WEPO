import React from 'react';
import propTypes from 'prop-types';
import styles from './datepickerinterface.css';
import FontAwesome from "react-fontawesome";
import DateTable from './DateTable';

/**
 * Provides a graphic interface prompting user to pick date
 * Renders feedback table (i.e. which month and year user currently sees)
 * and the table showing days in whatever month is displayed
 */
class DatePickerInterface extends React.Component{

    constructor(props, ctx) {
      super(props,ctx);
      this.state = {
        showPicker: false,
        date: new Date()
      };
    }

    // Sets datepicker initially to today's date
    componentDidMount() { this.updateDateStrings(); }

    // Updates current month string and current year string
    updateDateStrings() {
        this.setState({
            currMonth: String((this.state.date).getMonth()+1),
            currYear: String(this.state.date.getFullYear())
        });
    }

    // Whenever the date object is changed, user has picked a date
    componentDidUpdate(prevProps, prevState) {
        if(prevState.date !== this.state.date) {
            this.updateDateStrings();
            this.props.onClose();
            this.props.onDatePick(this.state.date.toLocaleDateString(this.props.locale));
        }
    }

    render() {

        const {currYear} = this.state;
        const {currMonth} = this.state;

        if(this.props.visible) {
            const firstDayInMonthWeekday = parseInt((new Date(parseInt(currYear, 10), parseInt(currMonth,10)-1, parseInt(1, 10))).getDay(), 10);
            return (
                <div className={`${styles.wrapper}`}>
                    <div className={`${styles.feedback}`}>
                        <div className={`${styles.monthWrapper}`}>
                            <span className={`${styles.decrement}`}>
                                <FontAwesome
                                    onClick={() => this.decrementMonth()}
                                    aria-hidden='false'
                                    name='angle-left'
                                />
                            </span>
                            <span className={`${styles.month}`}>
                                {months[parseInt(this.state.currMonth,10)-1]} 
                                    &nbsp;
                                {this.state.currYear}
                            </span>
                            <span className={`${styles.increment}`}>
                                <FontAwesome
                                    onClick={() => this.incrementMonth()}
                                    aria-hidden='false'
                                    name='angle-right'
                                />
                            </span>
                        </div>
                    </div>
                    <DateTable
                        daysInMonth={this.getMonthDays(this.state.currMonth, this.state.currYear)}
                        firstWeekdayOfMonth={firstDayInMonthWeekday}
                        onDayPick={(e) => this.setState({date: new Date(parseInt(currYear, 10), parseInt(currMonth,10)-1, parseInt(e.target.innerHTML, 10))})}
                    />
                </div>
            );
        } else return <div />;
    }

    // Increments month and date updates accordingly
    incrementMonth() {
        if(parseInt(this.state.currMonth, 10) < 12) {
            this.setState({ currMonth: String(parseInt(this.state.currMonth, 10)+1) });
        // Special case: increment to next year
        } else {
            this.setState({
                currMonth: String(1), 
                currYear: String(parseInt(this.state.currYear, 10)+1)
            });
        }
    }

    // Gets days in each month
    getMonthDays(m, year) {
        const month = parseInt(m, 10);
        if(month === 2 && this.isLeapYear(year)) {
            return 29;
        } else {
            return monthdays[this.state.currMonth-1];
        }
    }

    // Checks whether year is leap year
    isLeapYear(y) {
        const year = parseInt(y, 10);
        if (year%4 === 0) {
            if (year%100 === 0) {
                return year%400 === 0;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    // Decrements month and date updates accordingly
    decrementMonth() {
        if(parseInt(this.state.currMonth, 10) > 1) {
            this.setState({ currMonth: String(parseInt(this.state.currMonth, 10)-1) });
        // Special case: decrement to previous year
        } else {
            this.setState({
                currMonth: String(12), 
                currYear: String(parseInt(this.state.currYear, 10)-1)
            });
        }
    }

};

// Months and number of days in each month,
// Both indices in array correspond to month number in a year
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];	
const monthdays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// propTypes the interface needs to function
DatePickerInterface.propTypes = {
    /* Action to take when user picks a date, provides date string as parameter*/
    onDatePick: propTypes.func.isRequired,
    /* Action to take when datepicker interface is closed */
    onClose: propTypes.func.isRequired,
    /* Specifies whether the component should show */
    visible: propTypes.bool.isRequired,
    /* Locale for date fromat, defaults to is-IS */
    locale: propTypes.string
};

// Datepickerinterface default propes if none are provied
DatePickerInterface.defaultProps = {
    locale: 'is-IS'
};

export default DatePickerInterface;