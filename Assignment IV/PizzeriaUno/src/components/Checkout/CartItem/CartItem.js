import React from 'react';
import propTypes from 'prop-types';

// Dummy component: renders an cart list item in review view
const CartItem  = ({ pizza }) => {
    const { name, description, price, image } = pizza;
    return (
        <span className="cartItemWrapper col-md-12">
            <div className="pizzaInfo">
                <span><img className="pizzaImg" src={image} alt={name} /></span>
                <span className="pizzaName">{name}</span>
                <span className="pizzaDescription">{description}</span>
                <span className="pizzaPrice">{price} kr</span>
            </div>
        </span>
    );
};

// Variables cart item needs provided
CartItem.propTypes = {

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

export default CartItem;