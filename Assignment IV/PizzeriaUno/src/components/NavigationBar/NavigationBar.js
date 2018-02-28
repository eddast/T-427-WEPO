import React from 'react';
import Logo from '../../resources/PizzeriaUno.png';

const NavigationBar = () => {
    return (
        <div id='navBar'>
            <img href="#home" id='navBarLogo' width={80} src={Logo} alt='logo'/>
            <a className='navBarItem' href="#home">Home</a>
            <a className='navBarItem' href="#home">Menu</a>
            <a className='navBarItem' href="#home">Offers</a>
            <a className='navBarItem' href="#home">Cart</a>
            <a className='navBarItem navBarItemRight' href="#home">About Us</a>
        </div>
    );
}

export default NavigationBar;