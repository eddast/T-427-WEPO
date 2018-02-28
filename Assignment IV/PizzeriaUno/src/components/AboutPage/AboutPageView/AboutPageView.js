import React from 'react';
import NavigationBar from '../../NavigationBar/NavigationBar';
import AboutPageBody from '../AboutPageBody/AboutPageBody';

const AboutPageView = () => {
    return(
        <div className="pizzaBackground">
            <NavigationBar />
            <AboutPageBody />
        </div>
    );
};

export default AboutPageView;