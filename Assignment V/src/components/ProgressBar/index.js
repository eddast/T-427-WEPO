import React from 'react';
import PropTypes from 'prop-types';
import styles from './progressbar.css';

/**
 * Progress bar indicating progess by progress in %
 * Color specified by state (info, success, danger, warning)
 * Can be striped and animated (but not animated without being striped)
 */
const ProgressBar = ({ progress, state, striped, animated }) => {
    return (
        <div className={`${styles.progressbar} ${styles[`progressbar-${state}`]} `}>
            <div style={{ width: `${progress}%` }} className={`${styles.progress} ${styles[`progress-${state}`]} ${striped && styles.striped} ${animated && styles.animated}`}>{progress}%</div>
        </div>
    );
};

// Props progressbar needs to function
ProgressBar.propTypes = {
    /* number 0-100 denoting progress in % */
    progress: (props, propName) => {
        const prop = props[propName];
        if (prop >= 0 && prop <= 100) { return; }
        return new Error('Progress should be between 0 and 100');
    },
    /* state specifying color of progress bar */
    state: PropTypes.oneOf(['info', 'success', 'warning', 'danger']).isRequired,
    /* specifies whether progress bar is striped - defaults to false */
    striped: PropTypes.bool,
    /* specifies whether progress bar is animated - defaults to false */
    animated: PropTypes.bool
};

// Default props if not provided
ProgressBar.defaultProps = {
    striped: false,
    animated: false
};

export default ProgressBar;