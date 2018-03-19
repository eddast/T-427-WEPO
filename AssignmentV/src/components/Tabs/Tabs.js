import React from 'react';
import propTypes from 'prop-types';
import styles from './tabs.css';

/**
 * Renders tab bar with apparence theme and specific layout
 * Children are tabs and contain their own children as content
 */
const Tabs = ({theme, layout, onSelect, currentSelectedTab, children}) => {
    return (
        <div className={`${styles.tabbar}`}>
            <div className={`${layout==='vertical' && styles.vertical}`}>
                {children.map((tab) => (
                    <span
                        className={`${styles[`tabs-${theme}`]} ${currentSelectedTab===tab.props.selectionKey && styles[`selected-${theme}`]} ${styles[`item-${layout}`]}`}
                        key={tab.props.selectionKey}
                        onClick={() => onSelect(tab.props.selectionKey)}
                    >
                        {tab.props.title}
                    </span>
                ))}
            </div>
            <div className={`${styles.tabcontent} ${styles[`tabcontent-${theme}`]}`} >
                {children[currentSelectedTab-1].props.children}
            </div>
        </div>
    );
};

// Props tabs need to function
Tabs.propTypes = {
    /* Tabs theme, effects apparence. Defaults to light*/
    theme: propTypes.oneOf(['dark', 'light']),
    /*  Layout; determines whether tabs are placed horizontally (above content)
        or vertically (to the left of content) - defaults to horizontal */
    layout: propTypes.oneOf(['horizontal', 'vertical']),
    /* Action determining actions of tab selection */
    onSelect: propTypes.func.isRequired,
    /* Specifies which tab is open */
    currentSelectedTab: propTypes.number.isRequired
};

// Default props of tab bar
Tabs.defaultProps = {
    theme: 'light',
    layout: 'horizontal'
};

export default Tabs;