import React from 'react';
import propTypes from 'prop-types';
import styles from './datetable.css';

const DateTable = ({daysInMonth, firstWeekdayOfMonth, onDayPick}) => {

    const maxMonthSize = 31;
    const numberOfWeekdays = 7;
    const size = maxMonthSize + numberOfWeekdays;
    var daysIdx = 1;

    let rows = []
    let weekdays = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
    let monthDays = [];

    for(let i = 0; i < weekdays.length; i++) {
        weekdays[i] = <td className={`${styles.index}`} key={weekdays[i]} id={weekdays[i]}>{weekdays[i]}</td>
    }

    rows.push(<tr key={rows.length} id={rows.length}>{weekdays}</tr>)

    for (var day = 0; day < size; day++) {
        if(day!== 0 && day%7===0) {
            rows.push(<tr key={rows.length} id={rows.length}>{monthDays}</tr>)
            monthDays = [];
        }
        if(day < firstWeekdayOfMonth || daysInMonth < daysIdx) {
            monthDays.push(<td className={`${styles.entry}`} key={monthDays.length*rows.length} id={monthDays.length*rows.length}>&nbsp;</td>);
        } else {
            monthDays.push(<td onClick={(e) => onDayPick(e)}className={`${styles.entry}`} key={monthDays.length*rows.length} id={monthDays.length*rows.length}>{String(daysIdx)}</td>);
            daysIdx++;
        }
    }
    return(
        <table className={`${styles.table}`}>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

DateTable.propTypes = {
    daysInMonth: propTypes.number.isRequired,
    firstWeekdayOfMonth: propTypes.number.isRequired
}

export default DateTable;