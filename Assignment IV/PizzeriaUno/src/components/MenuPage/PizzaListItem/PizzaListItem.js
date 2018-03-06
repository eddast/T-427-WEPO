import React from 'react';
import propTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../../../actions/cartAction';

// List item for pizza used in menu view
class PizzaListItem extends React.Component {

    constructor (props, ctx) {
        super(props, ctx);
        this.state = { toCheckout : false } // Determines wheter user should be redirected to checkout
    }

    // Adds pizza to local storage cart via react redux function
    // Explicitly notifies user once added to cart
    // Offer user to immediately checkout cart
    // If so, sets redirect to true and redirects user to checkout
    addToLocalStorage(pizza) {
        var addToLocalStorageCart = this.props.addToCart;
        addToLocalStorageCart(pizza);
        var toCheckout = confirm(pizza.name + ' added to your cart!\nDo you wish to checkout your cart?\n(Press OK to checkout, cancel to keep browsing)');
        this.setState({toCheckout: toCheckout});
    }

    render() {

        // Extract all attributes of pizza to display them
        const { id, name, description, price, image } = this.props.pizza;

        // Redirects user to checkout if appropriate
        if(this.state.toCheckout === true) {
            return <Redirect to={{pathname: '/checkout'}} />;
        }

        // Otherwise, renders pizza list item with all appropriate values displayed
        // Provides method to add pizza to cart and a link to detail view for pizza
        return (
            <span className="pizzaWrapper col-md-3">
                <Link to={'/pizzas/' + id} >
                    <div className="pizzaInfo">
                        <p className="pizzaName">{name}</p>
                        <span><img className="pizzaImg" src={image} alt={name} /></span>
                        <p className="pizzaDescription">{description}</p>
                        <p className="pizzaPrice">{price} kr</p>
                    </div>
                </Link>
                <div className="pizzaOptions">
                    <span className="pizzaOrder" onClick={() => this.addToLocalStorage(this.props.pizza)}>Add to cart</span>
                    <Link to={'/pizzas/' + id} >
                        <span className="pizzaDetails">Details</span>
                    </Link>
                </div>
            </span>
        );
    }
};

// Variables pizzalistitem needs provided
PizzaListItem.propTypes = {

    /** Pizza obj needed to render list item in view
        Contains name, description, pice and image
    */
    pizza: propTypes.shape({
        name: propTypes.string,
        description: propTypes.string,
        price: propTypes.number,
        image: propTypes.string
    })
}

export default connect(null, { addToCart })(PizzaListItem);