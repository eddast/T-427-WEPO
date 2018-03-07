import React from 'react';
import propTypes from 'prop-types';
import LogoOffer from '../../../resources/PizzeriaUnoOffer.png';

// Dummy component: renders an offer list item
const OfferListItem = ({ itemoffer, onClick }) => {

    // Extract relevant values from offer props provided
    // render relevant information
    const { offer, price, validFor } = itemoffer;
    return (
        <span className="offerWrapper col-md-3" onClick={onClick}>
            <div className="offerInfo">
                <p className="offerName">{offer}</p>
                <p className="offerPrice">{price} kr*</p>
                <div className="offerImgWrapper">
                    <img className="offerImg" src={LogoOffer} alt="PizzeriaUno"/>
                </div>
                <p className="offerValidFor">Good for {validFor}</p>
            </div>
        </span>
    );
};

// Variables OfferListItem needs provided
OfferListItem.propTypes = {

    /** Offer obj needed to render list item in view
        Contains offer (description), price and whether
        it's valid for delivery or pickup
    */
    offer: propTypes.shape({
        offer: propTypes.string,
        price: propTypes.number,
        validFor: propTypes.string,
    }),
    /** Needs onClick functionality so that onClick
        events work as should, which is being redirected
        from the parent view (this is done in parent to keep
        the dummy component simple and dumb)
    */
    onClick: propTypes.func.isRequired
}

export default OfferListItem;