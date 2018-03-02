import React from 'react';
import NavigationBar from '../../NavigationBar/NavigationBar';
import OfferPageBody from '../OfferPageBody/OfferPageBody';

const OfferPageView = () => {
    return(
        <div className="pizzaBackground">
            <NavigationBar />
            <OfferPageBody />
        </div>
    );
};

export default OfferPageView;