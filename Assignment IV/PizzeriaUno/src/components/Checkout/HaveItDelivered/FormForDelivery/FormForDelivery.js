import React from 'react';

class DeliveryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            address: '',
            city: '',
            telephone: '',
            postalCode: '' 
        };

        this.handleChangeForName = this.handleChangeForName.bind(this);
        this.handleChangeForAddress = this.handleChangeForAddress.bind(this);
        this.handleChangeForCity = this.handleChangeForCity.bind(this);
        this.handleChangeForTelephone = this.handleChangeForTelephone.bind(this);
        this.handleChangeForPostalCode = this.handleChangeForPostalCode.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeForName(event) {
        this.setState({ name: event.target.value });
        this.showChangesForDebug();
    }

    handleChangeForAddress(event) {
        this.setState({ address: event.target.value });
    }

    handleChangeForCity(event) {
        this.setState({ city: event.target.value });
    }

    handleChangeForTelephone(event) {
        this.setState({ telephone: event.target.value });
    }

    handleChangeForPostalCode(event) {
        this.setState({ postalCode: event.target.value });
    }

    handleSubmit(event) {
        alert('You will be notified when the pizza is ready');
        event.preventDefault();
    }

    showChangesForDebug() {
        console.log('name: ' + this.state.name);
        console.log('address: ' + this.state.address);
        console.log('city: ' + this.state.city);
        console.log('telephone: ' + this.state.telephone);
        console.log('postal code: ' + this.state.postalCode);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label className='formsForDeliveryAndPickUp'>
                Name:
                    <input
                        type='text'
                        value={this.state.name}
                        onChange={this.handleChangeForName}
                    />
                </label>
                <label className='formsForDeliveryAndPickUp'>
                Address:
                    <input
                        type='text'
                        value={this.state.address}
                        onChange={this.handleChangeForAddress}
                    />
                </label>
                <label className='formsForDeliveryAndPickUp'>
                City:
                    <input
                        type='text'
                        value={this.state.city}
                        onChange={this.handleChangeForCity}
                    />
                </label>
                <label className='formsForDeliveryAndPickUp'>
                Telephone:
                    <input
                        type='number'
                        value={this.state.telephone}
                        onChange={this.handleChangeForTelephone}
                    />
                </label>
                <label className='formsForDeliveryAndPickUp'>
                Postal code:
                    <input
                        type='number'
                        value={this.state.postalCode}
                        onChange={this.handleChangeForPostalCode}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default DeliveryForm;