import React from 'react';
import NavigationBar from '../../NavigationBar/NavigationBar';
import FormForPickUp from './FormForPickUp/FormPickUp'

const PickUp = () => {
    return (
        <div className="pizzaBackground">
            <NavigationBar />
            <div className="pickupBody">
                <h1>Fill out your information</h1>
                <h2>We need your name and phone number to process your delicious order!</h2>
                <div className="customerForm">
                    <FormForPickUp />
                </div>
            </div>
        </div>
    );
};

export default PickUp;
