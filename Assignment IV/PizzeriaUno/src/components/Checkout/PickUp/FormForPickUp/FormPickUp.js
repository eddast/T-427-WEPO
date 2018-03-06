import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCustomerInfo, setCustomerInfo } from '../../../../actions/customerAction';

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

        if (this.state.name === '' || this.state.telephone === '') {
            alert('You left some form empty. That´s a big no no');
            return;
        }
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

    render() {
        if(this.state.toConfirmation === true ) {
            return <Redirect to={{
                pathname: '/checkout/pickup/confirmation',
                delivery: { referrer: false }
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
                    <div className="row"><div className="submitBtn text-center col-md-12"><input className="btn btn-info" type="submit" value="Order" /></div></div>
                </div>
            </form>
        );
    };
};

const mapStateToProps = ({ customer }) => {
    return { customer };
}

export default connect(mapStateToProps, { getCustomerInfo, setCustomerInfo })(PickUpForm);