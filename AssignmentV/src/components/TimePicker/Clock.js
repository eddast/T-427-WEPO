/***** INSPIRED by: https://cssanimation.rocks/clocks/ *************/
import React from 'react';
import propTypes from 'prop-types';
import styles from './clock.css'

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
        </article>
    );
};


Clock.propTypes = {
    hour: propTypes.number.isRequired,
    minutes: propTypes.number.isRequired
};

export default Clock