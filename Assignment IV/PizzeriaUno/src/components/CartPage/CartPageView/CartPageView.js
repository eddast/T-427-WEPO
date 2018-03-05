import React from 'react';
import NavigationBar from '../../NavigationBar/NavigationBar';
import CartPageBody from '../CartPageBody/CartPageBody';

const CartPageView = () => {
    return(
        <div className="pizzaBackground">
            <NavigationBar />
            <CartPageBody />
        </div>
    );
};

export default CartPageView;