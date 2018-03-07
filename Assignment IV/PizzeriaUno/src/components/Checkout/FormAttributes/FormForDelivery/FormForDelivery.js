import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCustomerInfo, setCustomerInfo } from '../../../../actions/customerAction';
import TextInput from '../../FormAttributes/TextInput/TextInput';

class DeliveryForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            city: '',
            telephone: '',
            postalCode: '',
            toConfirmation : false,
            customer: null,
            offerSelected: null
        };

        // Bind component functions to this context (called from subcomponents)
        this.handleChangeForName = this.handleChangeForName.bind(this);
        this.handleChangeForAddress = this.handleChangeForAddress.bind(this);
        this.handleChangeForCity = this.handleChangeForCity.bind(this);
        this.handleChangeForTelephone = this.handleChangeForTelephone.bind(this);
        this.handleChangeForPostalCode = this.handleChangeForPostalCode.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    // Get customer info from local storage immediately
    componentDidMount() {
        var getCustomer = this.props.getCustomerInfo;
        getCustomer();
    }

    // Once customer has loaded, input values are set appropriately to customer info
    componentDidUpdate(prevProps) {
        if(prevProps.customer !== this.props.customer) {
            this.setInputValues();
        }
    }

    setInputValues() {
        if(this.props.customer !== null) {
            this.setState({
                name: this.props.customer.name,
                address: this.props.customer.address,
                city: this.props.customer.city,
                telephone: this.props.customer.telephone,
                postalCode: this.props.customer.postalCode
            });
        }
    }

    render() {

        const { offerSelected } = this.props;
    
        // Redirect to confirmation, provided an offer
        if(this.state.toConfirmation === true && offerSelected !== null) {
            return <Redirect to={{
                pathname: '/offers/confirmation',
                offer: { referrer: offerSelected }
            }} />;

        // Redirect to confirmation, no offer provided
        } else if (this.state.toConfirmation === true ) {
            return <Redirect to={{
                pathname: '/checkout/delivery/confirmation',
                delivery: { referrer: true }
            }} />;
        }

        // If no redirect is appropriate user hasn't provided info
        // Display input fields
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="formAttributes col-centered">
                    <TextInput
                        label="Name:"
                        name={this.state.name}
                        value={this.state.name}
                        onChange={(e) => this.handleChangeForName(e)}
                        validate={(val) => this.validateOnlyLetterInput(val)}
                    />
                    <TextInput
                        label="Telephone:"
                        type="number"
                        name={this.state.telephone}
                        value={this.state.telephone}
                        onChange={(e) => this.handleChangeForTelephone(e)}
                        validate={val => this.validateTelephone(val)}
                    />
                    <TextInput
                        label="Address:"
                        name={this.state.address}
                        value={this.state.address}
                        onChange={(e) => this.handleChangeForAddress(e)}
                        validate={(val) => this.validateAddress(val)}
                    />
                    <TextInput
                        label="Postal Code:"
                        type="number"
                        name={this.state.postalCode}
                        value={this.state.postalCode}
                        onChange={(e) => this.handleChangeForPostalCode(e)}
                        validate={(val) => this.validatePostalCode(val)}
                    />
                    <TextInput
                        label="City:"
                        name={this.state.city}
                        value={this.state.city}
                        onChange={(e) => this.handleChangeForCity(e)}
                        validate={(val) => this.validateOnlyLetterInput(val)}
                    />
                </div>
                {this.getSubmitButton()}
            </form>
        );
    }


    /***************************
     *  INPUT HELPER FUNCTIONS
     ***************************/

    // Handle change functions
    handleChangeForName (event)         { this.setState({ name: event.target.value });      }
    handleChangeForAddress (event)      { this.setState({ address: event.target.value });   }
    handleChangeForCity (event)         { this.setState({ city: event.target.value });      }
    handleChangeForTelephone (event)    { this.setState({ telephone: event.target.value });  }
    handleChangeForPostalCode (event)   { this.setState({ postalCode: event.target.value }); }

    // Handle submit
    handleSubmit(event) {
        if(this.canSubmit()) {
            this.setState({ toConfirmation: true })
            var customer = {
                name: this.state.name,
                address: this.state.address,
                city: this.state.city,
                telephone: this.state.telephone,
                postalCode: this.state.postalCode,
            }
            this.setState({ customerInfo: customer});
            var setCustomer = this.props.setCustomerInfo;
            setCustomer(customer);
        }

        event.preventDefault();
    }

    // Validate name and city input
    // Can only be letter not numbers or other characters
    validateOnlyLetterInput(name) {
        if(name==='') {
            return 'This field is required';
        } else if(!(/^[A-Za-z\u00C0-\u017F\s]+$/.test(name))) {
            return 'Invalid input (only letters allowed)';
        }
        
        return '';
    }

    // Validate telephone input
    // Can only be numeric not letters or other characters
    validateTelephone(tel) {
        if(tel==='') {
            return 'Telephone required';
        } else if (!/^\d+$/.test(tel)) {
            return 'Telephone number invalid'
        }
        
        return '';
    }

    // Validate address input
    // Can only be a combination of letters and numbers but not other characters
    validateAddress(address) {
        if(address==='') {
            return 'Address required';
        } else if (!(/^[A-Za-z\u00C0-\u017F\s\d]+$/.test(address))) {
            return 'Address invalid (only letters and numbers allowed)'
        }
        
        return '';
    }

    // Validate postal codes
    // Can only be numbers not other characters
    // Watch out for postal code length;
    // Shortest postal code in the world is 2 digits
    // Longest postal code in the world is 10 digits
    validatePostalCode(postalCode) {
        if(postalCode==='') {
            return 'Postal code required';
        } else if (!/^\d+$/.test(postalCode)) {
            return 'Postal code invalid'
        } else if (postalCode.length > 10 || postalCode.length < 2) {
            return 'Postal code invalid (must be between 2-10 digits)'
        }
        
        return '';
    }



    /***************************
     *  RENDER HELPER FUNCTIONS
     ***************************/

    // Render submit button - render distinguishes between disabled buttons and clickable buttons visually 
    getSubmitButton() {
        if(this.canSubmit()) {
            return (
                <div className="row">
                    <div className="submitBtn text-center col-md-12">
                        <input className="btn btn-lg btn-primary" type="submit" value="Order" />
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="row">
                        <div className="submitBtn text-center col-md-12">
                            <input disabled="true" className="btn btn-secondary btn-lg btn-disabled" type="submit" value="Order" />
                        </div>
                    </div>
                    <div className="row text-center">
                        <span className="formErrorText">Cannot proceed; some fields are invalid - please review your info</span>
                    </div>
                </div>
            );
        }

    }

    // Returns true if user has provided all info and no info is ill-formed
    canSubmit() {
        return (
            this.validateOnlyLetterInput(this.state.name)==='' &&
            this.validateTelephone(this.state.telephone)==='' &&
            this.validateAddress(this.state.address)==='' &&
            this.validatePostalCode(this.state.postalCode)==='' &&
            this.validateOnlyLetterInput(this.state.city)===''
        );
    }
}

// Map redux store state to component props
const mapStateToProps = ({ customer }) => {
    return { customer };
}

export default connect(mapStateToProps, { getCustomerInfo, setCustomerInfo })(DeliveryForm);