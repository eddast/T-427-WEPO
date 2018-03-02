import React from 'react';
import Loader from '../../resources/PizzeriaUno.png';
import NavigationBar from '../NavigationBar/NavigationBar';

const LoadingScreen = () => {
    return(
        <div className='pizzaBackground'>
            <NavigationBar />
            <div className='loaderPage belowNavBarComponent'>
                <img id='loadImage' src={Loader} alt='loading...'/>
                <h1 id='loadingMessage'>Getting pizzas ready...</h1>
            </div>
        </div>
    );
}

export default LoadingScreen;