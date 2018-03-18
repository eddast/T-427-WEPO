import React from 'react';
import propTypes from 'prop-types';
import styles from './datepickerinterface.css';
import FontAwesome from "react-fontawesome";
import DateTable from './DateTable';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];	
const monthdays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

class DatePickerInterface extends React.Component{

    constructor(props, ctx) {
      super(props,ctx);
      this.state = {
        showPicker: false,
        date: new Date()
      };
    }

    componentDidMount() {
        this.updateDateStrings();
    }

    updateDateStrings() {
        this.setState({
            dateString: String((this.state.date).getDate()) + '.' + String((this.state.date).getMonth()+1) + '.' + String(this.state.date.getFullYear()),
            currMonth: String((this.state.date).getMonth()+1),
            currYear: String(this.state.date.getFullYear())
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.date !== this.state.date) {
            this.updateDateStrings();
            this.props.onClose();
        }
        if(prevState.dateString !== this.state.dateString) {
            this.props.onDatePick(this.state.dateString);
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
                        <FontAwesome onClick={() => this.decrementMonth()} className={`${styles.icon}`} aria-hidden='false' name='angle-left' />
                        {months[parseInt(this.state.currMonth,10)-1]}
                        <FontAwesome onClick={() => this.incrementMonth()}className={`${styles.icon}`} aria-hidden='false' name='angle-right' />
                        <div>{this.state.currYear}</div>
                    </div>
                    <DateTable
                        daysInMonth={monthdays[this.state.currMonth-1]}
                        firstWeekdayOfMonth={firstDayInMonthWeekday}
                        onDayPick={(e) => this.setState({date: new Date(parseInt(currYear, 10), parseInt(currMonth,10)-1, parseInt(e.target.innerHTML, 10))})}
                    />
                </div>
            );
        } else return <div />;
    }

    incrementMonth() {
        if(parseInt(this.state.currMonth, 10) < 12) {
            this.setState({
                currMonth: String(parseInt(this.state.currMonth, 10)+1)
            });
        } else {
            this.setState({
                currMonth: String(1), 
                currYear: String(parseInt(this.state.currYear, 10)+1)
            });
        }
    }
    decrementMonth() {
        if(parseInt(this.state.currMonth, 10) > 1) {
            this.setState({
                currMonth: String(parseInt(this.state.currMonth, 10)-1)
            });
        } else {
            this.setState({
                currMonth: String(12), 
                currYear: String(parseInt(this.state.currYear, 10)-1)
            });
        }
    }

};

DatePickerInterface.propTypes = {
    onDatePick: propTypes.func.isRequired,
    onClose: propTypes.func.isRequired,
    visible: propTypes.bool.isRequired,
    locale: propTypes.string
};

DatePickerInterface.defaultProps = {
    locale: 'is-IS'
};

export default DatePickerInterface;