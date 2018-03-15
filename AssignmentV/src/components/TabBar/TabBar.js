import React from 'react';
import PropTypes from 'prop-types';
import styles from './tabBar.css';

const TabBar = ({theme, layout, onSelect, currentSelectedTab, children}) => {
    return (
        <div>
            {children.map((tab) => (
                <span   className={`${styles.tabs} ${styles[`tabs-${theme}`]} ${currentSelectedTab===tab.props.selectionKey && styles.selected}`}
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

TabBar.PropTypes = {
    theme: PropTypes.oneOf(['dark', 'light']),
    layout: PropTypes.oneOf(['horizontal', 'vertical']),
    onSelect: PropTypes.func.isRequired,
    currentSelectedTab: PropTypes.number.isRequired
};

TabBar.defaultProps = {
    theme: 'light',
    layout: 'horizontal'
};

export default TabBar