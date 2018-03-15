import React from 'react';
import propTypes from 'prop-types';
import styles from './tabs.css';

const TabBar = ({theme, layout, onSelect, currentSelectedTab, children}) => {
    return (
        <div className={`${styles.tabbar}`}>
            <div className={`${layout==='vertical' && styles.vertical}`}>
                {children.map((tab) => (
                    <span   className={`${styles.tabs} ${styles[`tabs-${theme}`]} ${currentSelectedTab===tab.props.selectionKey && styles[`selected-${theme}`]} ${layout==='vertical' && styles[`vertical-item`]}`}
                            key={tab.props.selectionKey}
                            onClick={() => onSelect(tab.props.selectionKey)} >
                        {tab}
                    </span>
                ))}
            </div>
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