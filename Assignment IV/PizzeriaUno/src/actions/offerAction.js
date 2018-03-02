import { GET_ALL_OFFERS, GET_OFFER_BY_ID } from '../constants/offerConstants';
import fetch from 'isomorphic-fetch';

const getAllOffers = () => {
    return dispatch => fetch('http://localhost:3500/api/offers').then(json => json.json()).then(data => dispatch(getAllOffersSuccess(data)));
};

const getOfferByID = (offerid) => {
    return dispatch => fetch('http://localhost:3500/api/offers/' + offerid).then(json => json.json()).then(data => dispatch(getOfferByIDSuccess(data)));
};

export {
    getAllOffers,
    getOfferByID
}
 
const getAllOffersSuccess = (offers) => {
    return {
        type: GET_ALL_OFFERS,
        payload: offers
    };
};

const getOfferByIDSuccess = (offer) => {
    return {
        type: GET_OFFER_BY_ID,
        payload: offer
    };
};