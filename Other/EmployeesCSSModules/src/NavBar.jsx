import React from 'react';
import { NavLink } from 'react-router-dom';

// Dummy component: renders navigation bar with all links
const NavigationBar = () => {
    return (
        <nav>
            <NavLink
                to="/"
                activeClassName="active"
                className="navBarItem">Home</NavLink>
            <NavLink
                to="/contact"
                activeClassName="active"
                className="navBarItem">Contact</NavLink>
            <NavLink
                to="/employees"
                activeClassName="active"
                className="navBarItem">Employees</NavLink>
        </nav>
    );
};

export default NavigationBar;