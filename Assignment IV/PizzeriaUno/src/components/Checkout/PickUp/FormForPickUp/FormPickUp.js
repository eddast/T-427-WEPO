import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCustomerInfo, setCustomerInfo } from '../../../../actions/customerAction';
import TextInput from '../../FormAttributes/TextInput/TextInput';

class PickUpForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            telephone: '',
            customer: null,
            toConfirmation: false
        };

        // Bind component functions to this context (called from subcomponents)
        this.handleChangeForName = this.handleChangeForName.bind(this);
        this.handleChangeForTelephone = this.handleChangeForTelephone.bind(this);
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

    // Sets input values to custer info
    setInputValues() {
        if(this.props.customer !== null) {
            this.setState({
                name: this.props.customer.name,
                telephone: this.props.customer.telephone
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
        } else if(this.state.toConfirmation === true ) {
            return <Redirect to={{
                pathname: '/checkout/pickup/confirmation',
                delivery: { referrer: false }
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
                </div>
                {this.getSubmitButton()}
            </form>
        );
    }


    /***************************
     *  INPUT HELPER FUNCTIONS
     ***************************/

    // Handle forms functionality - i.e. change values on change and submit customer info
    handleChangeForName(event) { this.setState({ name: event.target.value }); }
    handleChangeForTelephone(event) { this.setState({ telephone: event.target.value }); }
    handleSubmit(event) {
        if(this.canSubmit) {
            this.setState({ toConfirmation: true })
            var customer = {
                name: this.state.name,
                telephone: this.state.telephone,
            }
            this.setState({ customerInfo: customer});
            event.preventDefault();
            var setCustomer = this.props.setCustomerInfo;
            setCustomer(customer);
        }
    }

    // Validate name input
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
            this.validateTelephone(this.state.telephone)===''
        );
    }
}

// Maps redux store state to component props
const mapStateToProps = ({ customer }) => {
    return { customer };
}

export default connect(mapStateToProps, { getCustomerInfo, setCustomerInfo })(PickUpForm);