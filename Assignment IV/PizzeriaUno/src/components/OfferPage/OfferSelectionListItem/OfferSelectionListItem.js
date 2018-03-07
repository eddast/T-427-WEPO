import React from 'react';
import propTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

// Dummy component: renders an offer item in offer item list view
// Visually distinguishes between seleced and unselected item
const OfferSelectionListItem = ({ isSelected, onClick, max, pizza }) => {

    const { name, description, price, image } = pizza;

    if (isSelected(pizza)) {
        return (
            <span className="offerSelectionItemWrapper col-md-10">
                <div onClick={() => onClick(pizza, max)} className="pizzaInfoSelected">
                    <FontAwesome className="offerCheck" name='check-circle' color="green"/>
                    <span><img className="pizzaImag" src={image} alt={name} /></span>
                    <span className="pizzaName">{name}</span>
                    <span className="pizzaDes">{description}</span>
                    <span className="pizzaPrice">{price} kr</span>
                </div>
            </span>
        );
    } else {
        return (
            <span className="offerSelectionItemWrapper col-md-10">
                <div onClick={() => onClick(pizza, max)} className="pizzaInfo">
                    <span><img className="pizzaImag" src={image} alt={name} /></span>
                    <span className="pizzaName">{name}</span>
                    <span className="pizzaDes">{description}</span>
                    <span className="pizzaPrice">{price} kr</span>
                </div>
            </span>
        );
    }
};

OfferSelectionListItem.propTypes = {
    /** pizza obj needed to render list item in view
        Contains name, description, price and image
    */
    pizza: propTypes.shape({
        name: propTypes.string,
        description: propTypes.string,
        price: propTypes.number,
        image: propTypes.string
    }),

    /** function that returns true if pizza is selected, false otherwise
        to visually distinguish between selected and non-selected pizzas
    */
    isSelected: propTypes.func.isRequired,

    /* onclick function that toggles pizza selection */
    onClick: propTypes.func.isRequired,

    /* Number determining how many pizzas can be selected (order-specific) */
    max: propTypes.number.isRequired
}

export default OfferSelectionListItem;