import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCartContents, replaceCart } from '../../../actions/cartAction';
import { getCustomerInfo } from '../../../actions/customerAction';
import { postOrder } from '../../../actions/orderAction';
import CartItem from '../../Checkout/CartItem/CartItem';
import NavigationBar from '../../NavigationBar/NavigationBar';

// Reviews order specific to provided offer
class OfferOrderReview extends React.Component {

    constructor (props, ctx) {
        super(props, ctx);
        this.state = {
            isLoading: true,
            confirmed: false
        };

        // Bind component functions to this context (called from subcomponents)
        this.confirmOrder = this.confirmOrder.bind(this);
    }

    // Load cart and customer immediately via redux actions
    componentDidMount() {
        var getCart = this.props.getCartContents;
        var getCustomer = this.props.getCustomerInfo;
        getCart();
        getCustomer();
    }

    // Triggered when user clicks confirmed to confirm order
    // Results in redirect to confirmation site
    // On confirm we post the order to the API and empty cart
    confirmOrder() {

        var offer = this.props.location.offer.referrer;

        // Trigger redirect in next render
        this.setState({confirmed: true});

        // create order model
        var orderModel = {
            cart: this.props.cart,
            offer: offer
        }

        // Post order to API
        var confirmOrder = this.props.postOrder;
        confirmOrder(this.props.customer.telephone, orderModel);

        // Empty cart
        var replaceCart = this.props.replaceCart;
        var emptyCart = []
        replaceCart(emptyCart);
    }

    render() {

        // Get necessary attributes from props for render
        var offer = this.props.location.offer.referrer;
        const { customer } = this.props;

        // Get loading screen while cart is loading
        if(this.props.cart == undefined || !this.props.cart) {
            return <div>Loading</div>;
        }

        var cart = {}
        
        if(this.props.cart.cart) {
            cart = this.props.cart.cart;
        } else {
            cart = this.props.cart;
        }
        console.log(offer);

        // Redirect user to checkout on confirm
        // Post order to API on confirm
        // (excluding coca colas since the API doesn't recognize those)
        if(this.state.confirmed === true) {

            // Redirect to confirmation site for explicit user feedback
            if(offer.delivery === 'delivery') {
                return < Redirect to={{
                    pathname: '/checkout/delivery/confirmation/done',
                }} />;
            } else {
                return < Redirect to={{
                    pathname: '/checkout/pickup/confirmation/done',
                }} />;
            }
        }

        console.log(cart);

        // If unconfirmed, display user info and cart contents
        // So that user has a chance to review his or her order before confirming
        return (
            <div className="pizzaBackground">
                <NavigationBar />
                <div className="confirmationBody">
                    <div className="row">
                        <h1>Please review your order </h1>
                        <div className="row">
                            <div className="userInfoReview col-centered col-md-7">{this.getUserInfo(customer, offer.validFor)}</div>
                        </div>
                        <h2>Items to checkout: </h2>
                        <div className='pizzasInMenu'>
                            {cart.map((pizza, i) => <CartItem key={i} pizza={pizza}/>)}
                            {this.getCoke(offer)}
                        </div>
                    </div>
                    <div className="row">
                        <h1 className="reviewTotal">Order Total: {this.getCartTotalForOffer(cart, offer)} kr*</h1>
                        <h2>{this.getExplainationText(offer)}</h2>
                    </div>
                    <div className="row confirmOptions">
                        <div className="confirmOption" onClick={this.confirmOrder}>Confirm</div>
                    </div>
                </div>
            </div>

        );
    }



    /***************************
     *  RENDER HELPER FUNCTIONS
     ***************************/

    // Get total price of cart, which is specific to the offer chosen
    getCartTotalForOffer(cart, offer) {
        if(offer.id === 1) {
            if(cart[0].price > cart[1].price) {
                return cart[0].price;
            } else {
                return cart[1].price;
            }
        } else {
            return offer.price;
        }
    }

    // If offer includes coke, add coke to cart contents list
    // Is a pseudo item in cart; i.e. is not actually part of order
    getCoke(offer) {
        if(offer.id > 1) {
            return (
                <span className="cartItemWrapper col-md-12">
                    <div className="pizzaInfo">
                        <span><img className="pizzaImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBN-z8mJj6F_BVKOQeeMapyijZV9EZWCkTosu2-oDZh1JAyXHA" alt="Coke" /></span>
                        <span className="pizzaName">Coca-Cola</span>
                        <span className="pizzaDescription">A refreshing delicious 2L Coca-Cola</span>
                        <span className="pizzaPrice">free*</span>
                    </div>
                </span>
            );
        }
    }

    // Text explaining obtained price, offer specific
    getExplainationText(offer) {
        if (offer.id === 1) {
            return '*Special offer price: two pizzas for the price of one (pay for more expensive pizza)';
        } else if (offer.id === 2) {
            return '*Special offer price: valid for two pizzas and a coke';
        } else if (offer.id === 3) {
            return '*Special offer price: valid for a pizza and a coke';
        }
    }
 
    // Gets user info, specific to deilvery method
    getUserInfo(customer, delivery) {
        if(delivery === 'delivery') {
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

export default connect(mapStateToProps, { getCartContents, postOrder, getCustomerInfo, replaceCart })(OfferOrderReview);