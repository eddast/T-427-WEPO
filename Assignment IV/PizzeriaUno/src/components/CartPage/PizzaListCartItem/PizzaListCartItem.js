import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { removeFromCart } from '../../../actions/cartAction';

class PizzaListCartItem extends React.Component {

    // Function which removes pizza from cart
    // Uses the removeFromCart redux function
    removeFromLocalStorage(pizza) {
        this.props.removeFromCart(pizza);
        alert(pizza.name + ' removed from cart!');
    }

    render() {

        // Access attributes of pizza to display
        const { id, name, description, price, image } = this.props.pizza;

        // Render all relevant information on pizza attributes
        // Provides a method to delete item (both via minus-circle icon and below button)
        return (
            <span className="pizzaWrapper col-md-3">
                <div className="pizzaInfo">
                    <span id="pizzaDeleteCartToolTip">
                        <FontAwesome className="pizzaDeleteCart" onClick={() => this.removeFromLocalStorage(this.props.pizza)} name="minus-circle" color="red"/>
                        <span className="toolTipText">Delete pizza from cart</span>
                    </span>
                    <p className="pizzaName">{name}</p>
                    <span><img className="pizzaImg" src={image} alt={name} /></span>
                    <p className="pizzaDescription">{description}</p>
                    <p className="pizzaPrice">{price} kr</p>
                </div>
                <div className="pizzaOptions">
                    <span className="pizzaRemove" onClick={() => this.removeFromLocalStorage(this.props.pizza)}>Remove from cart</span>
                    <Link to={'/pizzas/' + id} >
                        <span className="pizzaDetails">Details</span>
                    </Link>
                </div>
            </span>
        );
    }
};

// Variables pizza cart item needs provided
PizzaListCartItem.propTypes = {

    // The list item pizza to display
    pizza: propTypes.shape({
        name: propTypes.string,
        description: propTypes.string,
        price: propTypes.number,
        image: propTypes.string
    })
}

// Maps redux store state attribute to component props
const mapStateToProps = ({ cart }) => {
    return { cart };
}

export default connect(mapStateToProps, { removeFromCart })(PizzaListCartItem);