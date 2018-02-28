// import React from 'react';
// import Logo from '../../resources/PizzeriaUno.png';

// const NavigationBar = () => {
//     return (
//         <div id='navBar'>
//             <img href="#home" id='navBarLogo' width={80} src={Logo} alt='logo'/>
//             <a className='navBarItem' href="#home">Home</a>
//             <a className='navBarItem' href="#home">Menu</a>
//             <a className='navBarItem' href="#home">Offers</a>
//             <a className='navBarItem' href="#home">Cart</a>
//             <a className='navBarItem navBarItemRight' href="#home">About Us</a>
//         </div>
//     );
// }

// export default NavigationBar;

import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../resources/PizzeriaUno.png';

const NavigationBar = () => {
    return (
        <div className="pizzaBackground NavigationBar">
            <nav id="navBar">
                <img id='navBarLogo'src={Logo} alt="Home Page" />
                <NavLink
                    exact
                    to="/"
                    activeClassName="active"
                    className="navBarItem">Home</NavLink>
                <NavLink
                    to="/pizzas"
                    activeClassName="active"
                    className="navBarItem">Menu</NavLink>
                <NavLink
                    to="/offers"
                    activeClassName="active"
                    className="navBarItem">Offers</NavLink>
                <NavLink
                    to="/cart"
                    activeClassName="active"
                    className="navBarItem">Cart</NavLink>
                <NavLink
                    to="/about"
                    activeClassName="active"
                    className="navBarItem navBarItemRight">About Us</NavLink>
            </nav>
        </div>
    );
};
export default NavigationBar;