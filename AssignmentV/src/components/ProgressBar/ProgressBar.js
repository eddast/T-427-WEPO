import React from 'react';
import PropTypes from 'prop-types';
import styles from './progressbar.css';

const ProgressBar = ({ progress, state, striped, animated }) => {
    //${progress}
    return (
        <div className={`${styles.progressbar} ${styles[`progressbar-${state}`]}`}>
            <div style={{ width: `${progress}%` }} className={`${styles.progress} ${styles[`progress-${state}`]}`}>{progress}%</div>
        </div>
    );
};

ProgressBar.propTypes = {
    progress: PropTypes.number.isRequired,
    state: PropTypes.oneOf(['info', 'success', 'warning', 'danger']).isRequired,
    striped: PropTypes.bool,
    animated: PropTypes.bool
};

ProgressBar.defaultProps = {
    striped: false,
    animated: false
};

export default ProgressBar;