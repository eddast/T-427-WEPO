import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.css';
import Button from '../Button/Button';
import FontAwesome from 'react-fontawesome';

/**
 * Renders an overlaying 'alert box' or modal
 * User provides modal body and title as children
 * and an optional footer
 * Modal can be closed by top right exit button 
 */
const Modal = ({isOpen, onClose, children}) => {

        if(!isOpen) return <div />;

        return (
            <div className={`${styles.wrapcontent}`}>
                <div className={`${styles.background}`}>
                    <div className={`${styles.wrapper}`}>
                        <div className={`${styles.module}`}>
                            <div className={`${styles[`module-content`]}`}>
                                <div className={`${styles.btn}`}>
                                    <Button onClick={onClose}>
                                        <FontAwesome aria-hidden='false' size="2x" name='times'/>
                                    </Button>
                                </div>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
};

// Subcomponents of modal
Modal.Title =  ({ children }) => { return <h1 className={`${styles.title}`}>{children}</h1>;   };
Modal.Body =    ({ children }) => { return <div className={`${styles.body}`}>{children}</div>;  };
Modal.Footer =  ({ children }) => { return <div className={`${styles.footer}`}>{children}</div>;    };

// Props modal needs to function
Modal.propTypes = {
    /* states whether modal is open - defaults to false*/
    isOpen: PropTypes.bool,
    /* specifies action when modal is closed */
    onClose: PropTypes.func.isRequired
};

// Modal default props if not provided
Modal.defaultProps = {
    isOpen: false
};


export default Modal;