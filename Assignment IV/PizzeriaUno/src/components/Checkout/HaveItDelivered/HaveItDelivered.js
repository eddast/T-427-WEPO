import React from 'react';
import NavigationBar from '../../NavigationBar/NavigationBar';
import DeliveryForm from './FormForDelivery/FormForDelivery';

const HaveItDelivered = () => {
    return (
        <div className="pizzaBackground">
            <NavigationBar />
            <div className="emptySpaceBetweenCheckoutOptions"></div>
            <DeliveryForm />
        </div>
    );
};

export default HaveItDelivered;
