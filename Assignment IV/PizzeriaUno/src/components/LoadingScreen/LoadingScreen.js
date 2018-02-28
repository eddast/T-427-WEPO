import React from 'react';
import Loader from '../../resources/PizzeriaUno.png';

export default class InitialPage extends React.Component {
    render() {
        return(
            <div className='pizzaBackground'>
                <div className='loaderPage'>
                    <img id='loadImage' src={Loader} alt='loading...'/>
                    <h1 id='loadingMessage'>Getting things ready...</h1>
                </div>
            </div>
        );
    }
}