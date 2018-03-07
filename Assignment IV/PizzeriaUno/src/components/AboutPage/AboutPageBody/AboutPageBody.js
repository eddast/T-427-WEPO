import React from 'react';
import Chefs from '../../../resources/OurChefs.png'

// Dummy component: renders hard coded mock information on restaurant
const AboutPageBody = () => {
    return (
        <div className='row aboutPageBody belowNavBarComponent'>
            <div className='description col-md-offset-2 col-md-5'>
                <h1>About Us</h1>
                <p>If you’re hoping to experience a Italian gourmet feast in the heart of Reykjavik, there’s nothing quite like PizzeriaUno. Located only a few short blocks from Reykjavík central area at Reykjavík University, we’re conveniently accessible from anywhere in the city.</p>
                <p>Our chefs are not only culinary experts that make our pizza whole-heartedly delicious, but quite the talented web designers. We know you won’t be impressed with technology until you can download a pizza, but with our new amazing PizzeriaUno home page your pizza is only a click away!</p>
            </div>
            <div className='col-md-offset-1 col-md-4'>
                <div className='row'>
                    <img id='chefs' src={Chefs} alt='logo'/>
                </div>
                <div className='row'>
                    <p id='inPizzaWeCrust'>In pizza we crust!</p>
                </div>
            </div>
        </div>
    );
}

export default AboutPageBody;