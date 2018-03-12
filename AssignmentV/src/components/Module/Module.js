import React from 'react';
import PropTypes from 'prop-types';
import styles from './module.css';
import Button from '../Button/Button';

const Module = ({ isOpen, onClose, closeButtonLabel, children }) => {

    if(!isOpen) return <div />;

    return (
        <div>
            <div className={`${styles.background}`}>
                <div className={`${styles.wrapper}`}>
                    <div className={`${styles.module}`}>
                        <div className={`${styles[`module-content`]}`}>
                            <h1 className={`${styles.title}`}>Module Title</h1>
                            <div className={`${styles.body}`}>Body</div>
                            <div className={`${styles.btn}`}><Button onClick={onClose}>{closeButtonLabel}</Button></div>
                            <div className={`${styles.footer}`}>Footer</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Module.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    closeButtonLabel: PropTypes.string
};

Module.defaultProps = {
    isOpen: false,
    closeButtonLabel: 'close'
};

export default Module;