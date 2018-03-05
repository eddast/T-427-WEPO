import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const PizzaListCartItem = ({ pizza, removeFromLocalStorage }) => {
    const { id, name, description, price, image } = pizza;
    return (
        <span className="pizzaWrapper col-md-3">
            <div className="pizzaInfo">
                <span id="pizzaDeleteCartToolTip">
                    <FontAwesome className="pizzaDeleteCart" onClick={() => removeFromLocalStorage(pizza)} name="minus-circle" color="red"/>
                    <span className="toolTipText">Delete pizza from cart</span>
                </span>
                <p className="pizzaName">{name}</p>
                <span><img className="pizzaImg" src={image} alt={name} /></span>
                <p className="pizzaDescription">{description}</p>
                <p className="pizzaPrice">{price} kr</p>
            </div>
            <div className="pizzaOptions">
                <span className="pizzaRemove" onClick={() => removeFromLocalStorage(pizza)}>Remove from cart</span>
                <Link to={'/pizzas/' + id} >
                    <span className="pizzaDetails">Details</span>
                </Link>
            </div>
        </span>
    );
};

PizzaListCartItem.propTypes = {
    pizza: propTypes.shape({
        name: propTypes.string,
        description: propTypes.string,
        price: propTypes.number,
        image: propTypes.string
    }),
    removeFromLocalStorage: propTypes.func.isRequired
}

export default PizzaListCartItem;