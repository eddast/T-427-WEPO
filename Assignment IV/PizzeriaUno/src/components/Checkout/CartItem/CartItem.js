import React from 'react';
import propTypes from 'prop-types';

class CartItem extends React.Component {

    render() {
        const { name, description, price, image } = this.props.pizza;
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
    }
};

CartItem.propTypes = {
    pizza: propTypes.shape({
        name: propTypes.string,
        description: propTypes.string,
        price: propTypes.number,
        image: propTypes.string
    })
}

export default CartItem;