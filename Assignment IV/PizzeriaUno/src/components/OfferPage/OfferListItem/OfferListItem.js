import React from 'react';
import propTypes from 'prop-types';

const OfferListItem = ({ itemoffer }) => {
    const { offer, price, validFor } = itemoffer;
    return (
        <span className="offerWrapper col-md-3">
            <div className="offerInfo">
                <p className="offerName">{offer}</p>
                <p className="offerValidFor">{validFor}</p>
                <p className="offerPrice">{price} kr</p>
            </div>
        </span>
    );
};

OfferListItem.propTypes = {
    offer: propTypes.shape({
        offer: propTypes.string,
        price: propTypes.number,
        validFor: propTypes.string,
    })
}

export default OfferListItem;