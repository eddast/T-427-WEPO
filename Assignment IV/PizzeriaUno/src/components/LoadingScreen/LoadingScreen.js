import React from 'react';
import Loader from '../../resources/PizzeriaUno.png';

// Dummy component: renders spinning pizza logo to indicate content is loading
const LoadingScreen = () => {
    return(
        <div className='pizzaBackground'>
            <div className='loaderPage belowNavBarComponent'>
                <img id='loadImage' src={Loader} alt='loading...'/>
                <h1 id='loadingMessage'>Getting pizzas ready...</h1>
            </div>
        </div>
    );
}

export default LoadingScreen;