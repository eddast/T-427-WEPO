import React from 'react';
import NavigationBar from '../NavigationBar/NavigationBar';
import { connect } from 'react-redux';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { getCustomerInfo } from '../../actions/customerAction';
import { getCartContents, replaceCart } from '../../actions/cartAction';
import { getOrder } from '../../actions/orderAction';
import { Redirect } from 'react-router-dom';

// Renders user's options for checkout (can checkout cart or previous order)
class OrderPage extends React.Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            checkoutCart: false,
            checkoutPreviousOrder: false
        }
    }

    // Retrieve customer info and cart content immediately
    componentDidMount() {
        const { getCustomerInfo } = this.props;
        const { getCartContents } = this.props;
        getCustomerInfo();
        getCartContents();
    }

    // When customer loads, his or her previous order is retrieved
    componentDidUpdate(prevProps) {
        const { customer } = this.props;
        if(customer != prevProps.customer) {
            if(customer != null && customer.name != '') {
                const { getOrder } = this.props;
                getOrder(customer.telephone);
            }
        }
    }

    // Customer checkout options
    placeSameOrderAsLast() { this.setState({checkoutPreviousOrder: true}); }
    checkoutCart() { this.setState({checkoutCart: true}); }

    render() {

        // Exract appropriate values, retrieved by redux actions
        // console.log('this.props is: ');
        // console.log(this.props);
        const customer = this.props.customer;
        const cart = this.props.cart;
        const order = this.props.order;

        // Redirect user to checkout when he or she wants to checkout cart
        if(this.state.checkoutCart === true) {
            return <Redirect to={{pathname: '/checkout'}} />;
        }

        // If user wishes to use previous order, cart is replaced by it
        // Then user is redirected to checkout
        if(this.state.checkoutPreviousOrder === true) {
            replaceCart(cart);
            return <Redirect to={{pathname: '/checkout'}} />;
        }

        // Loading screen displayed while values are loading
        if(this.customerNotLoaded(customer) && this.cartNotLoaded(cart)) {
            return <LoadingScreen />;

        // Render specific options for specific situations: 
        // If no checkout is possible (i.e. no cart nor previous order) user is notified
        // If either checkout is not possible, user is explicitly notified
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

    // Conditional render boolean functions
    customerNotLoaded(customer) { return (customer != null) && (customer === undefined || customer.name === ''); }
    cartNotLoaded(cart) { return (cart === undefined || cart === null); }
    cartIsEmpty(cart) { return (cart.length === 0); }
    noPreviousOrder(order, customer) { return order === undefined || order === null || customer.name === ''; }

    // Explicitly notifies user that cart is empty (option unavailable)
    getEmptyChartOption() {
        return (
            <div className="pizzaBackground">
                <NavigationBar />
                <div className="orderPage">
                    <div className='unclickableOrderOption col-centered row'>Checkout My Cart</div>
                    <div className='col-centered row orderErrorMsg'>Cart is Empty</div>
                    <div className='clickableOrderOption col-centered row' onClick={() => this.placeSameOrderAsLast()}>Place the Same Order As Last Time</div>
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
                    <div className='unclickableOrderOption col-centered  row'>Place the Same Order As Last Time</div>
                    <div className='col-centered row orderErrorMsg'>No Previous Order!</div>
                </div>
            </div>
        );
    }

    // Both options are available (checkout and previous order)
    getOptions() {
        return (
            <div className="pizzaBackground">
                <NavigationBar />
                <div className="orderPage">
                    <div className='clickableOrderOption col-centered row' onClick={() => this.checkoutCart()}>Checkout My Cart</div>
                    <div className='clickableOrderOption col-centered row' onClick={() => this.placeSameOrderAsLast()}>Place the Same Order As Last Time</div>
                </div>
            </div>
        );
    }
        
}

// Maps redux store state attributes to component props
const mapStateToProps = (storeState) => {
    return { 
        customer: storeState.customer,
        cart: storeState.cart,
        order: storeState.order
    };
}

export default connect(mapStateToProps, { getCustomerInfo, getOrder, getCartContents, replaceCart }) (OrderPage);