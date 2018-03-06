import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCartContents, replaceCart } from '../../../actions/cartAction';
import { getCustomerInfo } from '../../../actions/customerAction';
import { postOrder } from '../../../actions/orderAction';
import CartItem from '../CartItem/CartItem';
import NavigationBar from '../../NavigationBar/NavigationBar';

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
    getCartTotal(cart) {
        let sum = 0;
        for(let i = 0; i < cart.length; i++ ) {
            sum = sum + cart[i].price;
        }
        
        return sum;
    }

    render() {

        var delivery = this.props.location.delivery && this.props.location.delivery.referrer;
        const { cart } = this.props;
        const { customer } = this.props;

        if(!cart) {
            return <div>Loading</div>;
        }
        if(this.state.redirectToCart === true) {
            return < Redirect to={{pathname: '/cart'}} />;
        }
        if(this.state.redirectToCustomerInfo === true) {
            if(delivery) {
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

const mapStateToProps = (storeState) => {
    return { 
        cart: storeState.cart,
        customer: storeState.customer
    };
}

export default connect(mapStateToProps, { getCartContents, postOrder, getCustomerInfo, replaceCart })(OrderReview);