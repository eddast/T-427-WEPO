import React from 'react';
import Logo from '../../resources/PizzeriaUno.png';
import FontAwesome from 'react-fontawesome';

const HomePage = () => {
    return(
        <div className='pizzaBackground'>
            <div className='initialPageContainer'>
                <h1 id='greeting'>B e n v e n u t o &nbsp; a &nbsp;</h1>
                <img id='logo' src={Logo} alt='logo'/>
                <h2 id='tagline'>"Love at first bite"</h2>
                <div className='optionBar'>
                    <a href='/pizzas' className='options'>M e n u &nbsp;&nbsp;<FontAwesome name='fire'/></a>
                    <a href='/offers' className='options'>O f f e r s &nbsp;&nbsp;<FontAwesome name='thumbs-up'/></a>
                    <a href='/cart' className='options'>C a r t &nbsp;&nbsp;<FontAwesome name='shopping-cart'/></a>
                    <a href='/about' className='options'>A b o u t &nbsp; U s &nbsp;&nbsp;<FontAwesome name='info-circle'/></a>
                </div>
            </div>
        </div>
    );
};

export default HomePage;