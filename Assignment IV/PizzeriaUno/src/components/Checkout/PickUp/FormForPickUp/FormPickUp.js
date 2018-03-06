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

        this.handleChangeForName = this.handleChangeForName.bind(this);
        this.handleChangeForTelephone = this.handleChangeForTelephone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        var getCustomer = this.props.getCustomerInfo;
        getCustomer();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.customer !== this.props.customer) {
            this.setInputValues();
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.customer !== this.props.customer) {
            this.setInputValues();
        }
    }

    setInputValues() {
        if(this.props.customer !== null) {
            this.setState({
                name: this.props.customer.name,
                telephone: this.props.customer.telephone
            });
        }
    }

    handleChangeForName(event) {
        this.setState({ name: event.target.value });
    }

    handleChangeForTelephone(event) {
        this.setState({ telephone: event.target.value });
    }

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

    render() {

        const { offerSelected } = this.props;

        if(this.state.toConfirmation === true && offerSelected !== null) {
            return <Redirect to={{
                pathname: '/offers/confirmation',
                offer: { referrer: offerSelected }
            }} />;
        } else if(this.state.toConfirmation === true ) {
            return <Redirect to={{
                pathname: '/checkout/pickup/confirmation',
                delivery: { referrer: false }
            }} />;
        }
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

    canSubmit() {
        return (
            this.validateOnlyLetterInput(this.state.name)==='' &&
            this.validateTelephone(this.state.telephone)===''
        );
    }

    validateOnlyLetterInput(name) {
        if(name==='') {
            return 'This field is required';
        } else if(!(/^[A-Za-z\u00C0-\u017F\s]+$/.test(name))) {
            return 'Invalid input (only letters allowed)';
        }
        
        return '';
    }

    validateTelephone(tel) {
        if(tel==='') {
            return 'Telephone required';
        } else if (!/^\d+$/.test(tel)) {
            return 'Telephone number invalid'
        }
        
        return '';
    }
}

const mapStateToProps = ({ customer }) => {
    return { customer };
}

export default connect(mapStateToProps, { getCustomerInfo, setCustomerInfo })(PickUpForm);