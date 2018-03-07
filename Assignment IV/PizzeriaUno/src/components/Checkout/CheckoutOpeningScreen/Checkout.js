import React from 'react';
import NavigationBar from '../../NavigationBar/NavigationBar';
import { Link } from 'react-router-dom';

// Dummy component: renders links for pickup and delivery options
const CheckoutPageView = () => {
    return (
        <div className="pizzaBackground">
            <NavigationBar />
            <div className="checkoutBody">
                <h1 id="checkoutOrPickupMessage">Please choose your preferred delivery option</h1>
                <div className="showOptionsForCheckout">
                    <Link to={'/checkout/delivery'} >
                        <p className="showOptionsForCheckoutText">Delivery</p>
                    </Link>
                </div>
                <div className="showOptionsForCheckout">
                    <Link to={'/checkout/pickup'} >
                        <p className="showOptionsForCheckoutText">Pick Up</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPageView;
