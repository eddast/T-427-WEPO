import propTypes from 'prop-types';

/**
 * A single tab in a tab bar component (Tabs)
 * Very, very dumb practically unnecessary component,
 * Only enhances readability of using the tab bar component
 */
const Tab = ({ title }) => { return {title}; };

// Props tabs needs to function; needs only title
Tab.propTypes = {
    title: propTypes.string.isRequired
};

export default Tab;