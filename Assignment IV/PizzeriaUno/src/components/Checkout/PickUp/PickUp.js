import React from 'react';
import NavigationBar from '../../NavigationBar/NavigationBar';
import FormForPickUp from './FormForPickUp/FormPickUp'

const PickItUp = () => {
    return (
        <div className="pizzaBackground">
            <NavigationBar />
            <div className="emptySpaceBetweenCheckoutOptions"></div>
            {/* <div className="showOptionsForCheckout">
                <p className="showOptionsForCheckoutText">User picks pizza up himself const</p>
            </div> */}
            <FormForPickUp />
        </div>
    );
};

export default PickItUp;
