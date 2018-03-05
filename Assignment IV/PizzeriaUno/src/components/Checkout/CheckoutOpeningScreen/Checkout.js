import React from 'react';
import NavigationBar from '../../NavigationBar/NavigationBar';
import { Link } from 'react-router-dom';

const CheckoutPageView = () => {
    return (
        <div className="pizzaBackground">
            <NavigationBar />
            <div className="emptySpaceBetweenCheckoutOptions"></div>
            <div className="showOptionsForCheckout">
                <Link to={'/pickItUp/'} >
                    <p className="showOptionsForCheckoutText">Pickup the pizza</p>
                </Link>
            </div>
            <div className="emptySpaceBetweenCheckoutOptions"></div>
            <div className="showOptionsForCheckout">
                <Link to={'/delivery/'} >
                    <p className="showOptionsForCheckoutText">Have it delivered to your addres</p>
                </Link>
            </div>
        </div>
    );
};

export default CheckoutPageView;
