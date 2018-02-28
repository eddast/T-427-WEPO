import React from 'react';
import Logo from '../../resources/PizzeriaUno.png';

export default class InitialPage extends React.Component {
    render() {
        return(
            <div className='pizzaBackground'>
                <div className='initialPageContainer'>
                    <h1 id='greeting'>B e n v e n u t o &nbsp; a &nbsp;</h1>
                    <img id='logo' src={Logo} alt='logo'/>
                    <h2 id='tagline'>"Love at first bite"</h2>
                    <div className='optionBar'>
                        <span className='options'>M e n u</span>
                        <span className='options'>O f f e r s</span>
                        <span className='options'>A b o u t &nbsp; U s</span>
                        <span className='options'>C a r t</span>
                    </div>
                </div>
            </div>
        );
    }
}