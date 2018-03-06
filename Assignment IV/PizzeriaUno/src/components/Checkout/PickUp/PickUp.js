import React from 'react';
import NavigationBar from '../../NavigationBar/NavigationBar';
import FormForPickUp from './FormForPickUp/FormPickUp'

class PickUp extends React.Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            offerSelected: null
        }
    }

    render() {

        if(this.props.location != undefined && this.props.location.offerSelected != undefined && this.props.location.offerSelected.referrer != undefined) {
            this.state.offerSelected = this.props.location.offerSelected.referrer;
        }
        return (
            <div className="pizzaBackground">
                <NavigationBar />
                <div className="pickupBody">
                    <h1>Fill out your information</h1>
                    <h2>We need your name and phone number to process your delicious order!</h2>
                    <div className="customerForm">
                        <FormForPickUp offerSelected={this.state.offerSelected}/>
                    </div>
                </div>
            </div>
        );
    }
};

export default PickUp;
