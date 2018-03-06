import React from 'react';
import NavigationBar from '../../NavigationBar/NavigationBar';
import CartPageBody from '../CartPageBody/CartPageBody';

// Dummy component: renders navigation bar and cart page contents
const CartPageView = () => {
    return(
        <div className="pizzaBackground">
            <NavigationBar />
            <CartPageBody />
        </div>
    );
};

export default CartPageView;