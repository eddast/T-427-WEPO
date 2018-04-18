import React from 'react';
import CoffeeBanner from './resources/CoffeeBanner.jpg'

export default class Home extends React.Component {
  render() {
    return (
        <div>
            <img style={{marginLeft:'-20px', width: '110%'}} id='loadImage' src={CoffeeBanner} alt='loading...'/>
            <div>
                <p>Here we have got some good shit information on this good shit company.</p>
                <p>We like our coffeefee</p>
            </div>
        </div>
    );
  }
}