import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCartContents, replaceCart } from '../../../actions/cartAction';
import { getCustomerInfo } from '../../../actions/customerAction';
import { postOrder } from '../../../actions/orderAction';
import CartItem from '../CartItem/CartItem';
import NavigationBar from '../../NavigationBar/NavigationBar';

// Reviews order
class OrderReview extends React.Component {

    constructor (props, ctx) {
        super(props, ctx);
        this.state = {
            isLoading: true,
            selectedPizza: null,
            confirmed: false,
            redirectToCart: false,
            redirectToCustomerInfo: false
        };

        // Bind component functions to this context (called from subcomponents)
        this.confirmOrder = this.confirmOrder.bind(this);
        this.redirectToCart = this.redirectToCart.bind(this);
        this.redirectToCustomerInfo = this.redirectToCustomerInfo.bind(this);
    }

    // Load cart and customer immediately via redux actions
    componentDidMount() {
        var getCart = this.props.getCartContents;
        var getCustomer = this.props.getCustomerInfo;
        getCart();
        getCustomer();
    }

    // Triggered when user clicks buttons
    // Results in redirect to confirmation site
    // When order is confirmed, we post it to API and empty cart
    confirmOrder() {

        // Trigger redirect in next render
        this.setState({confirmed: true});

        // create order model
        var orderModel = {
            cart: this.props.cart,
            offer: null
        }

        // Post order to API
        var confirmOrder = this.props.postOrder;
        confirmOrder(this.props.customer.telephone, orderModel);

        // Empty cart
        var replaceCart = this.props.replaceCart;
        var emptyCart = []
        replaceCart(emptyCart);
    }

    // Redirect to cart or customer info if customer wants to change info
    redirectToCart() { this.setState({redirectToCart: !this.state.redirectToCart}); }
    redirectToCustomerInfo() { this.setState({redirectToCustomerInfo: !this.state.redirectToCustomerInfo}); }

    render() {
        // Get necessary attributes from props for render
        var delivery = this.props.location.delivery && this.props.location.delivery.referrer;
        const { customer } = this.props;
        const { cart } = this.props;

        // Get loading screen while cart is loading
        if(this.props.cart === undefined || !this.props.cart) {
            return <div>Loading</div>;
        }

        // Redirect user to info input forms view
        // in order for him or her to edit their cart
        if(this.state.redirectToCart === true) {
            return < Redirect to={{pathname: '/cart'}} />;
        }

        // Redirect user to info input forms view
        // in order for him or her to edit their userinfo
        if(this.state.redirectToCustomerInfo === true) {
            if(delivery) {
                return < Redirect to={{pathname: '/checkout/delivery'}} />;
            } else {
                return < Redirect to={{pathname: '/checkout/pickup'}} />;
            }
        }

        // Redirect user to checkout on confirm
        // Post order to API on confirm
        if(this.state.confirmed === true) {
            if(delivery) {
                return < Redirect to={{
                    pathname: '/checkout/delivery/confirmation/done',
                }} />;
            } else {
                return < Redirect to={{
                    pathname: '/checkout/pickup/confirmation/done',
                }} />;
            }
        }

        // If unconfirmed, display user info and cart contents
        // So that user has a chance to review his or her order before confirming
        return (
            <div className="pizzaBackground">
                <NavigationBar />
                <div className="confirmationBody">
                    <div className="row">
                        <h1>Please review your order </h1>
                        <div className="row">
                            <div className="userInfoReview col-centered col-md-7">{this.getUserInfo(customer, delivery)}</div>
                        </div>
                        <h2>Items to checkout: </h2>
                        <div className='pizzasInMenu'>
                            {cart.map((pizza, i) => <CartItem key={i} pizza={pizza}/>)}
                        </div>
                    </div>
                    <div className="row">
                        <h1 className="reviewTotal">Order Total: {this.getCartTotal(cart)} kr</h1>
                    </div>
                    <div className="row confirmOptions">
                        <div className="confirmOption" onClick={this.confirmOrder}>Confirm</div>
                        <div className="confirmOption" onClick={this.redirectToCart}>Edit Cart</div>
                        <div className="confirmOption" onClick={this.redirectToCustomerInfo}>Edit Customer Information</div>
                    </div>
                </div>
            </div>

        );
    }



    /***************************
     *  RENDER HELPER FUNCTIONS
     ***************************/

    // Get total price of cart
    getCartTotal(cart) {
        let sum = 0;
        for(let i = 0; i < cart.length; i++ ) {
            sum = sum + cart[i].price;
        }
        
        return sum;
    }
 
    // Gets user info, specific to deilvery method
    getUserInfo(customer, delivery) {
        if(delivery) {
            return (
                <div>
                    <p>Customer Name:  {customer.name}, tel. {customer.telephone}</p>
                    <p>Delivery Method: Pizza Delivered to  {customer.address}, {customer.postalCode} {customer.city}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <p>Customer Name:  {customer.name}, tel. {customer.telephone}</p>
                    <p>Delivery Method: Pickup at PizzeriaUno</p>
                </div>
            );
        }
    }
}

// Maps redux store state to component props
const mapStateToProps = (storeState) => {
    return { 
        cart: storeState.cart,
        customer: storeState.customer
    };
}

export default connect(mapStateToProps, { getCartContents, postOrder, getCustomerInfo, replaceCart })(OrderReview);