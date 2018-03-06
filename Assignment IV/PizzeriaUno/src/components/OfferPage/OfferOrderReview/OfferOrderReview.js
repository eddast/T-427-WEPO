import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCartContents, replaceCart } from '../../../actions/cartAction';
import { getCustomerInfo } from '../../../actions/customerAction';
import { postOrder } from '../../../actions/orderAction';
import CartItem from '../../Checkout/CartItem/CartItem';
import NavigationBar from '../../NavigationBar/NavigationBar';

class OfferOrderReview extends React.Component {

    constructor (props, ctx) {
        super(props, ctx);
        this.state = {
            isLoading: true,
            selectedPizza: null,
            confirmed: false,
            redirectToCart: false,
            redirectToCustomerInfo: false
        };

        this.confirmOrder = this.confirmOrder.bind(this);
        this.redirectToCart = this.redirectToCart.bind(this);
        this.redirectToCustomerInfo = this.redirectToCustomerInfo.bind(this);
    }

    componentDidMount() {
        var getCart = this.props.getCartContents;
        var getCustomer = this.props.getCustomerInfo;
        getCart();
        getCustomer();
    }

    // Navigation
    confirmOrder() { this.setState({confirmed: !this.state.confirmed}); }
    redirectToCart() { this.setState({redirectToCart: !this.state.redirectToCart}); }
    redirectToCustomerInfo() { this.setState({redirectToCustomerInfo: !this.state.redirectToCustomerInfo}); }
    
    // Get total price of cart
    getCartTotalForOffer(cart, offer) {
        console.log(offer);
        if(offer.id === 1) {
            console.log(cart);
            if(cart[0].price > cart[1].price) {
                return cart[0].price;
            } else {
                return cart[1].price;
            }
        } else {
            return offer.price;
        }
    }

    render() {
        var offer = this.props.location.offer.referrer;
        const { cart } = this.props;
        const { customer } = this.props;

        if(!cart) {
            return <div>Loading</div>;
        }
        if(this.state.redirectToCart === true) {
            return < Redirect to={{pathname: '/cart'}} />;
        }
        if(this.state.redirectToCustomerInfo === true) {
            if(offer.delivery === 'delivery') {
                return < Redirect to={{pathname: '/checkout/delivery'}} />;
            } else {
                return < Redirect to={{pathname: '/checkout/pickup'}} />;
            }
        }
        if(this.state.confirmed === true) {
            var orderModel = {
                telephone: customer.telephone,
                cart: cart
            }
            var confirmOrder = this.props.postOrder;
            confirmOrder(orderModel);
            var replaceCart = this.props.replaceCart;
            var emptyCart = []
            replaceCart(emptyCart);
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

        return (
            <div className="pizzaBackground">
                <NavigationBar />
                <div className="confirmationBody">
                    <div className="row">
                        <h1>Please review your order </h1>
                        <div className="row">
                            <div className="userInfoReview col-centered col-md-7">{this.getUserInfo(customer, offer.delivery)}</div>
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

    getCoke(offer) {
        if(offer.id > 1) {
            return (
                <span className="cartItemWrapper col-md-12">
                    <div className="pizzaInfo">
                        <span><img className="pizzaImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBN-z8mJj6F_BVKOQeeMapyijZV9EZWCkTosu2-oDZh1JAyXHA" alt="Coke" /></span>
                        <span className="pizzaName">Coca-Cola</span>
                        <span className="pizzaDescription">A refreshing delicious 2L Coca-Cola</span>
                        <span className="pizzaPrice">0 kr*</span>
                    </div>
                </span>
            );
        }
    }

    getExplainationText(offer) {
        if (offer.id === 1) {
            return '*Special offer price: two pizzas for the price of one (pay for more expensive pizza)';
        } else if (offer.id === 2) {
            return '*Special offer price: valid for two pizzas and a coke';
        } else if (offer.id === 3) {
            return '*Special offer price: valid for a pizzas and a coke';
        }
    }
 
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

const mapStateToProps = (storeState) => {
    return { 
        cart: storeState.cart,
        customer: storeState.customer
    };
}

export default connect(mapStateToProps, { getCartContents, postOrder, getCustomerInfo, replaceCart })(OfferOrderReview);