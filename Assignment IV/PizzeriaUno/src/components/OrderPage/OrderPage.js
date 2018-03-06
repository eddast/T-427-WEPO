import React from 'react';
import NavigationBar from '../NavigationBar/NavigationBar';
import { connect } from 'react-redux';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { getCustomerInfo } from '../../actions/customerAction';
import { getCartContents, replaceCart } from '../../actions/cartAction';
import { getOrder } from '../../actions/orderAction';
import { Redirect } from 'react-router-dom';

class OrderPage extends React.Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            checkoutCart: false,
            checkoutPreviousOrder: false
        }
    }

    componentDidMount() {
        const { getCustomerInfo } = this.props;
        const { getCartContents } = this.props;
        getCustomerInfo();
        getCartContents();
    }

    componentDidUpdate(prevProps) {
        const { customer } = this.props;
        if(customer != prevProps.customer) {
            if(customer != null && customer.name != '') {
                const { getOrder } = this.props;
                getOrder(customer.telephone);
            }
        }
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

        if(this.state.checkoutCart === true) {
            return <Redirect to={{pathname: '/checkout'}} />;
        }

        if(this.state.checkoutPreviousOrder === true) {
            replaceCart(order.cart);
            return <Redirect to={{pathname: '/checkout'}} />;
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
     * ON CLICK OPTION FUNCTIONS
     ***************************/
    placeSameOrderAsLast() { this.setState({checkoutPreviousOrder: true}); }

    checkoutCart() { this.setState({checkoutCart: true}); }

    /***************************
     *  RENDER HELPER FUNCTIONS
     ***************************/

    // Explicitly notifies user that cart is empty (option unavailable)
    getEmptyChartOption() {
        return (
            <div className="pizzaBackground">
                <NavigationBar />
                <div className="orderPage">
                    <div className='unclickableOrderOption col-centered row' onClick={() => this.checkoutCart()}>Checkout My Cart</div>
                    <div className='col-centered row orderErrorMsg'>Cart is Empty</div>
                    <div className='clickableOrderOption col-centered row' onClick={() => this.placeSameOrderAsLast()}>Place the Same Order As Last Time (will replace cart contents)</div>
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
                    <h1>No previous order nor cart selection available</h1>
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
                    <div className='clickableOrderOption col-centered row' onClick={() => this.checkoutCart()}>Checkout My Cart</div>
                    <div className='unclickableOrderOption col-centered  row'>Place the Same Order As Last Time (will replace cart contents)</div>
                    <div className='col-centered row orderErrorMsg'>No Previous Order!</div>
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
                    <div className='clickableOrderOption col-centered row' onClick={() => this.checkoutCart()}>Checkout My Cart</div>
                    <div className='clickableOrderOption col-centered row' onClick={() => this.placeSameOrderAsLast()}>Place the Same Order As Last Time (will replace cart contents)</div>
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

export default connect(mapStateToProps, { getCustomerInfo, getOrder, getCartContents, replaceCart }) (OrderPage);