import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCartContents } from '../../../actions/cartAction';
import { getCustomerInfo } from '../../../actions/customerAction';
import { postOrder } from '../../../actions/orderAction';
import PizzaListItem from '../../MenuPage/PizzaListItem/PizzaListItem';
import NavigationBar from '../../NavigationBar/NavigationBar';

class OrderReview extends React.Component {

    constructor (props, ctx) {
        super(props, ctx);
        this.state = {
            isLoading: true,
            selectedPizza: null,
            confirmed: false
        };

        this.confirmOrder = this.confirmOrder.bind(this);
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
        alert('should redirect to cart');
    }

    redirectToCustomerInfo() {
        alert('should redirect to customer info');
    }

    render() {
        var delivery = this.props.location.delivery && this.props.location.delivery.referrer;
        const { cart } = this.props;
        const { customer } = this.props;
        if(!cart) {
            return <div>Loading</div>;
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
                <h1>Please review your order </h1>
                <h3>Items to checkout: </h3>
                <div className='pizzasInMenu'>
                    {cart.map(pizza => <PizzaListItem key={pizza.id} pizza={pizza}/>)}
                </div>
                <span onClick={this.confirmOrder}>Confirm</span>
                <span onClick={this.redirectToCart}>Edit cart</span>
                <span onClick={this.redirectToCustomerInfo}>Edit information</span>
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