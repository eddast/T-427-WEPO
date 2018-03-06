import React from 'react';
import NavigationBar from '../../NavigationBar/NavigationBar';
import MenuPageBody from '../MenuPageBody/MenuPageBody';

// Dummy component: renders navigation bar and menu content
const MenuPageView = () => {
    return(
        <div className="pizzaBackground">
            <NavigationBar />
            <MenuPageBody />
        </div>
    );
};

export default MenuPageView;