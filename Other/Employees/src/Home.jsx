import React from 'react';
import CoffeeBanner from './resources/CoffeeBanner.jpg';
import CompanyInfo from './CompanyInfo.json';

export default class Home extends React.Component {
  render() {
    return (
        <div>
            <img style={{marginLeft:'-20px', width: '110%'}} id='loadImage' src={CoffeeBanner} alt='loading...'/>
            <div>
                {CompanyInfo.company_information}
            </div>
        </div>
    );
  }
}