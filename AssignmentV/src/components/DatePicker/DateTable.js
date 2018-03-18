import React from 'react';
import propTypes from 'prop-types';
import styles from './datetable.css';

/**
 * Constructs a day table for a month with given number of days
 * And on which weekday the first day in month is
 */
const DateTable = ({daysInMonth, firstWeekdayOfMonth, onDayPick}) => {
    let rows = []

    rows = populateWeekdaysTableIdx(rows);
    rows = populateDaysInMonthEntries(rows, daysInMonth, firstWeekdayOfMonth, onDayPick);

    return(
        <table className={`${styles.table}`}>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

// Set up indices for table, i.e. weekdays
const populateWeekdaysTableIdx = (rows) => {
    let weekdays = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
    for(let i = 0; i < weekdays.length; i++) {
        weekdays[i] = <td className={`${styles.index}`} key={weekdays[i]} id={weekdays[i]}>{weekdays[i]}</td>
    }
    rows.push(<tr key={rows.length} id={rows.length}>{weekdays}</tr>)
    let ret = rows;

    return ret;
}

// Places days in correct entry in table
// i.e. corresponding to indices/weekdays
// SUCH AI MUCH WOW!!!
const populateDaysInMonthEntries = (rows, daysInMonth, firstWeekdayOfMonth, onDayPick) => {

    // Get size of table, day index and populate array
    const maxMonthSize = 31; const numberOfWeekdays = 7;
    const size = maxMonthSize + numberOfWeekdays;
    let monthDays = []; let daysIdx = 1;

    for (let i = 0; i < size; i++) {
        // Start a new row once monthdays has a week's worth of entry 
        if (monthDays.length === numberOfWeekdays) {
            rows.push(<tr key={rows.length} id={rows.length}>{monthDays}</tr>)
            monthDays = [];
        }
        // Push an empty entry before month 'starts' and after it has 'passed'
        if( i < firstWeekdayOfMonth || daysInMonth < daysIdx ) {
            monthDays.push(<td className={`${styles.entry}`} key={monthDays.length*rows.length} id={monthDays.length*rows.length}>&nbsp;</td>);
            
        // Otherwise push an actual day entry
        } else {
            monthDays.push(<td onClick={(e) => onDayPick(e)}className={`${styles.entry}`} key={monthDays.length*rows.length} id={monthDays.length*rows.length}>{String(daysIdx)}</td>);
            daysIdx++;
        }
    }

    return rows;
}

// PropTypes date table needs to function
DateTable.propTypes = {

    /* Determines how many days are in month for dateTable */
    daysInMonth: propTypes.number.isRequired,
    /* Determines on which day the first day in month is*/
    firstWeekdayOfMonth: propTypes.number.isRequired,
    /* Defines action when a date is picked from table*/
    onDayPick: propTypes.func.isRequired
}


export default DateTable;