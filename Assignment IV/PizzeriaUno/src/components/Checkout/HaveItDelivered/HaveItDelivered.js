import React from 'react';
import NavigationBar from '../../NavigationBar/NavigationBar';

const HaveItDelivered = () => {
    return (
        <div className="pizzaBackground">
            <NavigationBar />
            <div className="emptySpaceBetweenCheckoutOptions"></div>
            <div className="showOptionsForCheckout">
                <p className="showOptionsForCheckoutText">Pizza delivered to user const</p>
            </div>
        </div>
    );
};

export default HaveItDelivered;
