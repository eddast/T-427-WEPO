import React from 'react';
import NavigationBar from '../../NavigationBar/NavigationBar';
import Loader from '../../../resources/PizzeriaUno.png';

// Dummy component that renders explicit feedback that order was processed
// I.e. tells customer his pizza is going into oven
const ConfirmOrder =() => {
    return (
        <div className="pizzaBackground">
            <NavigationBar />
            <div className="confirmationBody">
                <h1>PIZZA IS GOING IN THE OVEN </h1>
                <h2>In just a couple of minutes you'll get your promised italian gourmet feast!</h2>
                <img id='loadImage' src={Loader} alt='loading...'/>
                <p>Loading pizza...</p>
            </div>
        </div>

    ); 
}

export default ConfirmOrder;