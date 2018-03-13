import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.css';
import Button from '../Button/Button';
import FontAwesome from 'react-fontawesome';


const Modal = ({isOpen, onClose, children}) => {

    console.log(children);
        if(!isOpen) return <div />;

        return (
            <div>
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

Modal.Title =  ({ children }) => { return <h1 className={`${styles.title}`}>{children}</h1>;   };
Modal.Body =    ({ children }) => { return <div className={`${styles.body}`}>{children}</div>;  };
Modal.Footer =  ({ children }) => { return <div className={`${styles.footer}`}>{children}</div>;    };

Modal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func.isRequired
};

Modal.defaultProps = {
    isOpen: false
};


export default Modal;