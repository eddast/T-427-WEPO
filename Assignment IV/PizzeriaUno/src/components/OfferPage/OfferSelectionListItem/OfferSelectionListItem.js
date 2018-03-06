import React from 'react';
import propTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

class OfferSelectionListItem extends React.Component {

    render() {
        const { name, description, price, image } = this.props.pizza;
        const { onClick }  = this.props;
        const { isSelected } = this.props;
        const { max } = this.props;

        if (isSelected(this.props.pizza)) {
            return (
                <span className="offerSelectionItemWrapper col-md-10">
                    <div onClick={() => onClick(this.props.pizza, max)} className="pizzaInfoSelected">
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
                    <div onClick={() => onClick(this.props.pizza, max)} className="pizzaInfo">
                        <span><img className="pizzaImag" src={image} alt={name} /></span>
                        <span className="pizzaName">{name}</span>
                        <span className="pizzaDes">{description}</span>
                        <span className="pizzaPrice">{price} kr</span>
                    </div>
                </span>
            );
        }
    }
};

OfferSelectionListItem.propTypes = {
    pizza: propTypes.shape({
        name: propTypes.string,
        description: propTypes.string,
        price: propTypes.number,
        image: propTypes.string
    })
}

export default OfferSelectionListItem;