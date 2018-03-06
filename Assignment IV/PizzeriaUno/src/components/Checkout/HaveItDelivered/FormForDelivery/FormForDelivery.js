import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCustomerInfo, setCustomerInfo } from '../../../../actions/customerAction';

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
            customer: null
        };

        this.handleChangeForName = this.handleChangeForName.bind(this);
        this.handleChangeForAddress = this.handleChangeForAddress.bind(this);
        this.handleChangeForCity = this.handleChangeForCity.bind(this);
        this.handleChangeForTelephone = this.handleChangeForTelephone.bind(this);
        this.handleChangeForPostalCode = this.handleChangeForPostalCode.bind(this);
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

    handleChangeForName(event) {
        this.setState({ name: event.target.value });
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
        this.setState({ toConfirmation: true })
        var customer = {
            name: this.state.name,
            address: this.state.address,
            city: this.state.city,
            telephone: this.state.telephone,
            postalCode: this.state.postalCode,
        }
        this.setState({ customerInfo: customer});
        event.preventDefault();
        var setCustomer = this.props.setCustomerInfo;
        setCustomer(customer);
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
        if (this.state.toConfirmation === true ) {
            return <Redirect to={{
                pathname: '/checkout/delivery/confirmation',
                delivery: { referrer: true }
            }} />;
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="formAttributes col-centered">
                    <div className="row">
                        <label className='formsForDeliveryAndPickUp col-md-offset-3 col-md-2'>
                            Name:
                        </label>
                        <div className="col-md-4">
                            <input className="form-control"
                                type='text'
                                value={this.state.name}
                                onChange={this.handleChangeForName}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <label className='formsForDeliveryAndPickUp col-md-offset-3 col-md-2'>
                            Address:
                        </label>
                        <div className="col-md-4">
                            <input className="form-control"
                                type='text'
                                value={this.state.address}
                                onChange={this.handleChangeForAddress}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <label className='formsForDeliveryAndPickUp col-md-offset-3 col-md-2'>
                            Postal code:
                        </label>
                        <div className="col-md-4">
                            <input className="form-control"
                                type='number'
                                value={this.state.postalCode}
                                onChange={this.handleChangeForPostalCode}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <label className='formsForDeliveryAndPickUp col-md-offset-3 col-md-2'>
                        City:
                        </label>
                        <div className="col-md-4">
                            <input className="form-control"
                                type='text'
                                value={this.state.city}
                                onChange={this.handleChangeForCity}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <label className='formsForDeliveryAndPickUp col-md-offset-3 col-md-2'>
                            Telephone:
                        </label>
                        <div className="col-md-4">
                            <input className="form-control"
                                type='number'
                                value={this.state.telephone}
                                onChange={this.handleChangeForTelephone}
                            />
                        </div>
                    </div>
                </div>
                <div className="row"><div className="submitBtn text-center col-md-12"><input className="btn btn-info" type="submit" value="Order" /></div></div>
            </form>
        );
    }
}

const mapStateToProps = ({ customer }) => {
    return { customer };
}

export default connect(mapStateToProps, { getCustomerInfo, setCustomerInfo })(DeliveryForm);