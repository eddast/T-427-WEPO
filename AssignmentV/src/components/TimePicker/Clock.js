/***** IDEA FROM: https://cssanimation.rocks/clocks/ !*************/
import React from 'react';
import propTypes from 'prop-types';
import styles from './clock.css'

/**
 * A very very cool clock component THAT WE ARE SO PROUD OF!! 
 * Takes in hours and minutes and displays the time on a clock
 * Has a clock background and hours container, i.e. the hour hand
 * and minutes container, i.e. the minutes hand
 * Rotates the hands by appropriate degrees, given the time
 */
const Clock = ({ hour, minutes }) => {

    const hourAngle = hour * (360/12);
    const minuteAngle = minutes * (360/60);

    return (
        <article className={`${styles.clock}`}>
            <div className={`${styles[`hours-container`]}`} style={{ transform: `rotateZ(${hourAngle}deg)`}}>
                <div className={`${styles.hours}`}></div>
            </div>
            <div className={`${styles[`minutes-container`]}`} style={{transform: `rotateZ(${minuteAngle}deg)`}}>
                <div className={`${styles.minutes}`}></div>
            </div>
            <div className={`${styles[`center-container`]}`}>
                <div className={`${styles.center}`}></div>
            </div>
        </article>
    );
};

// Props clock needs to function
Clock.propTypes = {
    /* takes in hour, logically 0-12 or 0-24 but will just render the modulo value of {hour}%12 as hour*/
    hour: propTypes.number.isRequired,
    /* takes in hour, logically 0-59 but will just render the modulo value of {minutes}%59*/
    minutes: propTypes.number.isRequired
};


export default Clock;