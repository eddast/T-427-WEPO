import React from 'react';

class PickUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            telephone: '',
        };

        this.handleChangeForName = this.handleChangeForName.bind(this);
        this.handleChangeForTelephone = this.handleChangeForTelephone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeForName(event) {
        this.setState({ name: event.target.value });
        this.showChangesForDebuggingPurposes();
    }

    handleChangeForTelephone(event) {
        this.setState({ telephone: event.target.value });
    }

    handleSubmit(event) {
        //Needs to be implemented
        event.preventDefault();
        if (this.state.name === '' || this.state.telephone === '') {
            alert('You left some form empty. That´s a big no no');
            return false;
        }
        //Do stuff here, f.x. save data to local storage 
        alert('Your pizza is now in the oven, we will notify you when it is ready for pick up');
    }

    onKeyPressed(event) {
        if (event.key === 'e' || event.key === 'E') {
            return false;
        }
        console.log('I pressed key: ' + event.key);
    }

    showChangesForDebuggingPurposes() {
        console.log('name: ' + this.state.name);
        console.log('telephone: ' + this.state.telephone);
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
                Telephone:
                    <input
                        type='number'
                        onKeyDown={(e) => this.onKeyPressed(e)}
                        value={this.state.telephone}
                        onChange={this.handleChangeForTelephone}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    };
};

export default PickUpForm;