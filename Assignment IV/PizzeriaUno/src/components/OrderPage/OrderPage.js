import React from 'react';
import NavigationBar from '../NavigationBar/NavigationBar';
import { connect } from 'react-redux';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { getCustomerInfo } from '../../actions/customerAction';
import { getCartContents } from '../../actions/cartAction';
import { getOrder } from '../../actions/orderAction';

class OrderPage extends React.Component {

    componentDidMount() {
        const { getCustomerInfo } = this.props;
        const { getCartContents } = this.props;
        getCustomerInfo();
        getCartContents();
    }

    customerNotLoaded(customer) {
        return (customer != null) && (customer === undefined || customer.name === '');
    }

    cartNotLoaded(cart) {
        return (cart === undefined || cart === null);
    }

    cartIsEmpty(cart) {
        return (cart.length === 0);
    }

    noPreviousOrder(order, customer) {
        return order === undefined || order === null || customer.name === '';
    }

    render() {

        const { customer } = this.props;
        const { cart } = this.props;
        const { order } = this.props;

        // Get order when customer telephone has been retrieved
        if(!this.customerNotLoaded(customer) && order == null) {
            if(customer != null && customer.name != '') {
                const { getOrder } = this.props;
                getOrder(customer.telephone);
            }
        }
        if(this.customerNotLoaded(customer) && this.cartNotLoaded(cart)) {
            return <LoadingScreen />;

        } else if(this.cartIsEmpty(cart) && this.noPreviousOrder(order, customer)) {
            return this.getUnableToOrderView();

        } else if(this.noPreviousOrder(order, customer)) { 
            return this.getNoPreviousOrderView();

        } else if(this.cartIsEmpty(cart)) {
            return this.getEmptyChartOption();

        } else {
            return this.getOptions();
        }
    }

    /***************************
     *  RENDER HELPER FUNCTIONS
     ***************************/

    // Explicitly notifies user that cart is empty (option unavailable)
    getEmptyChartOption() {
        return (
            <div className="pizzaBackground">
                <NavigationBar />
                <div className="orderPage">
                    <div className='row'>Checkout My Cart</div>
                    <div>Cart Empty!</div>
                    <div className='row'>Place the Same Order As Last Time</div>
                </div>
            </div>
        );
    }

    // Explicitly notifies user that cart is empty and no previous order
    // Hence he or she can't order (both options unavailable)
    getUnableToOrderView() {
        return (
            <div className="pizzaBackground">
                <NavigationBar />
                <div className="orderPage">
                    <h1>You must either have placed an order before or have items in cart to order</h1>
                    <h2>Look at our delicious pizzas in the menu section, add to cart and have yourself a feast!</h2>
                </div>
            </div>
        );
    }

    // Explicitly notifies user that no previous order was found (option unavailable)
    getNoPreviousOrderView() {
        return (
            <div className="pizzaBackground">
                <NavigationBar />
                <div className="orderPage">
                    <div className='row'>Checkout My Cart</div>
                    <div className='row'>Place the Same Order As Last Time</div>
                    <div>No Previous Order!</div>
                </div>
            </div>
        );
    }

    // Both options available
    getOptions() {
        return (
            <div className="pizzaBackground">
                <NavigationBar />
                <div className="orderPage">
                    <div className='row'>Checkout My Cart</div>
                    <div className='row'>Place the Same Order As Last Time</div>
                </div>
            </div>
        );
    }
        
}

// Maps store state attributes to props
const mapStateToProps = (storeState) => {
    return { 
        customer: storeState.customer,
        cart: storeState.cart,
        order: storeState.order
    };
}

export default connect(mapStateToProps, { getCustomerInfo, getOrder, getCartContents }) (OrderPage);