import React from 'react';
import NavigationBar from '../../NavigationBar/NavigationBar';
import OfferPageBody from '../OfferPageBody/OfferPageBody';

// Dummy component: renders navigation bar and offer page
const OfferPageView = () => {
    return(
        <div className="pizzaBackground">
            <NavigationBar />
            <OfferPageBody />
        </div>
    );
};

export default OfferPageView;