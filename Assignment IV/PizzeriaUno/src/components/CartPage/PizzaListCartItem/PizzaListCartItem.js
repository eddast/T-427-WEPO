import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { removeFromCart } from '../../../actions/cartAction';

class PizzaListCartItem extends React.Component {

    removeFromLocalStorage(pizza) {
        this.props.removeFromCart(pizza);
        alert(pizza.name + ' removed from cart!');
    }

    render() {
        const { id, name, description, price, image } = this.props.pizza;
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

PizzaListCartItem.propTypes = {
    pizza: propTypes.shape({
        name: propTypes.string,
        description: propTypes.string,
        price: propTypes.number,
        image: propTypes.string
    })
}
const mapStateToProps = ({ cart }) => {
    return { cart };
}

export default connect(mapStateToProps, { removeFromCart })(PizzaListCartItem);