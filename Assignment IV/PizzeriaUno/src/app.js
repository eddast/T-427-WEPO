import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';
import Logo from './resources/PizzeriaUno.png';

class App extends React.Component {
    render() {
        return(
            <div className='initialPage'>
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
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
