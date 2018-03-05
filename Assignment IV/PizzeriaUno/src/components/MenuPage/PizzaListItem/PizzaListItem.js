import React from 'react';
import propTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../../../actions/cartAction';

class PizzaListItem extends React.Component {

    constructor (props, ctx) {
        super(props, ctx);
        this.state = {
            toCheckout : false
        }
    }

    // Adds pizza to local storage cart via react redux function
    addToLocalStorage(pizza) {
        var addToLocalStorageCart = this.props.addToCart;
        addToLocalStorageCart(pizza);
        var toCheckout = confirm(pizza.name + ' added to your cart!\nDo you wish to checkout your cart?\n(Press OK to checkout, cancel to keep browsing)');
        this.setState({toCheckout: toCheckout});
    }

    render() {
        const { id, name, description, price, image } = this.props.pizza;
        if(this.state.toCheckout === true) {
            return <Redirect to={{pathname: '/checkout'}} />;
        }
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

PizzaListItem.propTypes = {
    pizza: propTypes.shape({
        name: propTypes.string,
        description: propTypes.string,
        price: propTypes.number,
        image: propTypes.string
    })
}

export default connect(null, { addToCart })(PizzaListItem);