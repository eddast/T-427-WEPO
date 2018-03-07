import React from 'react';
import NavigationBar from '../../NavigationBar/NavigationBar';
import DeliveryForm from './FormForDelivery/FormForDelivery';

// Almost dummy component: renders form for delivery
// If any offer is selected, component extracts it and passes it on to forms
class HaveItDelivered extends React.Component {

    constructor(props, ctx) {
        super(props,ctx);
        this.state = { offerSelected: null }
    }

    render() {

        if(this.props.location != undefined && this.props.location.offerSelected != undefined && this.props.location.offerSelected.referrer != undefined) {
            this.state.offerSelected = this.props.location.offerSelected.referrer;
        }
        return (
            <div className="pizzaBackground">
                <NavigationBar />
                <div className="deliveryBody">
                    <div className="deliveryHeadings">
                        <h1>Fill out your information</h1>
                        <h2>Please provide accurate information on address so that the pizza will not get lost!</h2>
                    </div>
                    <div className="customerForm">
                        <DeliveryForm offerSelected={this.state.offerSelected} />
                    </div>
                </div>
            </div>
        );
    }
};

export default HaveItDelivered;
