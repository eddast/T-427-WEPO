import React from 'react';
import NavigationBar from '../../NavigationBar/NavigationBar';
import { connect } from 'react-redux';
import { getOrder } from '../../../actions/orderAction';
import { getCustomerInfo } from '../../../actions/customerAction';
import Loader from '../../../resources/PizzeriaUno.png';

class ConfirmOrder extends React.Component {

    componentDidMount() {
        const { getCustomerInfo } = this.props;
        getCustomerInfo();
    }

    render() {
        const { customer } = this.props;
        const { order } = this.props;
        if(order === undefined || order === null) {
            const { getOrder } = this.props;
            getOrder(customer.telephone);
        }
        return (
            <div className="pizzaBackground">
                <NavigationBar />
                <div className="confirmationBody">
                    <h1>PIZZA IS GOING IN THE OVEN </h1>
                    <h2>In just a couple of minutes you'll get your promised italian gourmet feast!</h2>
                    <img id='loadImage' src={Loader} alt='loading...'/>
                    <p>Loading pizza...</p>
                </div>
            </div>

        );
    }
        
}
const mapStateToProps = (storeState) => {
    return { 
        customer: storeState.customer,
        order: storeState.order
    };
}

export default connect(mapStateToProps, { getOrder, getCustomerInfo }) (ConfirmOrder);