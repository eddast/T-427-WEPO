import React from 'react';
import PizzaListCartItem from '../PizzaListCartItem/PizzaListCartItem';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCartContents } from '../../../actions/cartAction';

class CartPageBody extends React.Component {

    // Get user 'cart' from local storage from redux reducer
    componentDidMount() {
        this.props.getCartContents();
    }  

    render() {
        // Display loading message while still fetching cart
        if (this.props.cart === null) {
            return <LoadingScreen />;
        
        // Display appropriate message for an empty cart
        }

        var cart = {}
        
        if(this.props.cart.cart) {
            cart = this.props.cart.cart;
        } else {
            cart = this.props.cart;
        }

        if(cart.length === 0) {
            return (
                <div className='cartBody'>
                    <div className="pageViewHeadings">
                        <h1>Cart is empty!</h1>
                        <h2>Che orribile! Go explore our menu under the 'menu' page. We have delicious pizzas!</h2>
                    </div>
                </div>
            );

        // Display cart contents for a non-empty cart
        // Includes a checkout button which links to checkout
        } else {
            return (
                <div className='cartBody'>
                    <div className='row'>
                        <div className="pageViewHeadings">
                            <h1>Your cart</h1>
                            <h2>Mamma mia! You're clearly in for a feast!</h2>
                        </div>
                        <div className='pizzasInMenu'>
                            {cart.map((pizza, i) => <PizzaListCartItem key={i} pizza={pizza} removeFromLocalStorage={this.removeFromLocalStorage}/>)}
                        </div>
                    </div>
                    <div className='row'>
                        <Link to={'/checkout'} >
                            <span id="checkoutButton">
                                Checkout &nbsp; &nbsp;
                                <FontAwesome name="arrow-right"/>
                            </span>
                        </Link>
                    </div>
                </div>
            );
        }
    }
};

// Maps redux store state attribute to component props 
const mapStateToProps = ({ cart }) => {
    return { cart };
}

export default connect(mapStateToProps, { getCartContents })(CartPageBody);