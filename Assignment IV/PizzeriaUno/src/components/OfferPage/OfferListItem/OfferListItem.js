import React from 'react';
import propTypes from 'prop-types';
import LogoOffer from '../../../resources/PizzeriaUnoOffer.png';

const OfferListItem = ({ itemoffer, onClick }) => {
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

OfferListItem.propTypes = {
    offer: propTypes.shape({
        offer: propTypes.string,
        price: propTypes.number,
        validFor: propTypes.string,
    })
}

export default OfferListItem;