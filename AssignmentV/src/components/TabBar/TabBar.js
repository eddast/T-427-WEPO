import React from 'react';
import propTypes from 'prop-types';
import styles from './tabBar.css';

const TabBar = ({theme, layout, onSelect, currentSelectedTab, children}) => {
    return (
        <div>
            {children.map((tab) => (
                <span   className={`${styles.tabs} ${styles[`tabs-${theme}`]} ${currentSelectedTab===tab.props.selectionKey && styles[`selected-${theme}`]}`}
                        key={tab.props.selectionKey}
                        onClick={() => onSelect(tab.props.selectionKey)} >
                    {tab}
                </span>
            ))}
            <div className={`${styles.tabcontent} ${styles[`tabcontent-${theme}`]}`} >
                {children[currentSelectedTab-1].props.children}
            </div>
        </div>
    );
};

TabBar.propTypes = {
    theme: propTypes.oneOf(['dark', 'light']),
    layout: propTypes.oneOf(['horizontal', 'vertical']),
    onSelect: propTypes.func.isRequired,
    currentSelectedTab: propTypes.number.isRequired
};

TabBar.defaultProps = {
    theme: 'light',
    layout: 'horizontal'
};

export default TabBar