import React from 'react';
import PizzaListCartItem from '../PizzaListCartItem/PizzaListCartItem';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCartContents } from '../../../actions/cartAction';

class CartPageBody extends React.Component {

    // Get 'cart' from local storage from redux reducer
    componentDidMount() {
        this.props.getCartContents();
    }  

    render() {
        if (this.props.cart === null) {
            return <LoadingScreen />;
        } else if(this.props.cart.length === 0) {
            return (
                <div className='cartBody'>
                    <div className="pageViewHeadings">
                        <h1>Cart is empty!</h1>
                        <h2>Che orribile! Go explore our menu under the 'menu' page. We have delicious pizzas!</h2>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='cartBody'>
                    <div className='row'>
                        <div className="pageViewHeadings">
                            <h1>Your cart</h1>
                            <h2>Mamma mia! You're clearly in for a feast!</h2>
                        </div>
                        <div className='pizzasInMenu'>
                            {this.props.cart.map((pizza, i) => <PizzaListCartItem key={i} pizza={pizza} removeFromLocalStorage={this.removeFromLocalStorage}/>)}
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

const mapStateToProps = ({ cart }) => {
    return { cart };
}

export default connect(mapStateToProps, { getCartContents })(CartPageBody);