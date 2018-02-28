import React from 'react';
import propTypes from 'prop-types';

const PizzaListItem = ({ pizza }) => {
    const { name, description, price, image } = pizza;
    return (
        <span className="pizzaWrapper col-md-3">
            <div className="pizzaInfo">
                <p className="pizzaName">{name}</p>
                <span><img className="pizzaImg" src={image} alt={name} /></span>
                <p className="pizzaDescription">{description}</p>
                <p className="pizzaPrice">{price} kr</p>
            </div>
            <div className="pizzaOptions">
                <span className="pizzaOrder">YUM! Order!</span>
                <span className="pizzaDetails">Details</span>
            </div>
        </span>
    );
};

PizzaListItem.propTypes = {
    pizza: propTypes.shape({
        name: propTypes.string,
        description: propTypes.string,
        price: propTypes.number,
        image: propTypes.string
    })
}

export default PizzaListItem;