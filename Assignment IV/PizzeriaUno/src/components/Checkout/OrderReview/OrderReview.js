import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCartContents } from '../../../actions/cartAction';
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

    confirmOrder() {
        this.setState({confirmed: !this.state.confirmed});
    }

    redirectToCart() {
        this.setState({redirectToCart: !this.state.redirectToCart});
    }

    redirectToCustomerInfo() {
        this.setState({redirectToCustomerInfo: !this.state.redirectToCustomerInfo});
    }

    render() {
        var delivery = this.props.location.delivery && this.props.location.delivery.referrer;
        const { cart } = this.props;
        const { customer } = this.props;
        if(!cart) {
            return <div>Loading</div>;
        }
        if(this.state.redirectToCart === true) {
            return < Redirect to={{
                pathname: '/cart',
            }} />;
        }
        if(this.state.redirectToCustomerInfo === true) {
            if(delivery) {
                return < Redirect to={{
                    pathname: '/checkout/delivery',
                }} />;
            } else {
                return < Redirect to={{
                    pathname: '/checkout/pickup',
                }} />;
            }
        }
        if(this.state.confirmed === true) {
            var orderModel = {
                telephone: customer.telephone,
                cart: cart
            }
            var confirmOrder = this.props.postOrder;
            confirmOrder(orderModel);
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
                        <h2>Items to checkout: </h2>
                        <div className='pizzasInMenu'>
                            {cart.map((pizza, i) => <CartItem key={i} pizza={pizza}/>)}
                        </div>
                    </div>
                    <div className="row confirmOptions">
                        <div className="confirmOption" onClick={this.confirmOrder}>Confirm</div>
                        <div className="confirmOption" onClick={this.redirectToCart}>Edit cart</div>
                        <div className="confirmOption" onClick={this.redirectToCustomerInfo}>Edit information</div>
                    </div>
                </div>
            </div>

        );
    }
        
}

const mapStateToProps = (storeState) => {
    return { 
        cart: storeState.cart,
        customer: storeState.customer
    };
}

export default connect(mapStateToProps, { getCartContents, postOrder, getCustomerInfo })(OrderReview);