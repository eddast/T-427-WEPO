import React from 'react';
import NavigationBar from '../../NavigationBar/NavigationBar';
import DeliveryForm from './FormForDelivery/FormForDelivery';

const HaveItDelivered = () => {
    return (
        <div className="pizzaBackground">
            <NavigationBar />
            <div className="deliveryBody">
                <div className="deliveryHeadings">
                    <h1>Fill out your information</h1>
                    <h2>Please provide accurate information on address so that the pizza will not get lost!</h2>
                </div>
                <div className="customerForm">
                    <DeliveryForm />
                </div>
            </div>
        </div>
    );
};

export default HaveItDelivered;
