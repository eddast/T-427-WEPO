import React from 'react';
import { shallow } from 'enzyme';
import OfferListItem from './OfferListItem';

jest.useFakeTimers();

// OfferListItem is a dummy component - i.e. no logic really
// It's purpose is to display a proptype pizza with an onclick function
describe('OfferListItem render appropriate values for pizza tests', () => {

    // Create a mock offer for testing purposes
    const mockOffer = {
        offer: 'Mock Offer',
        price: 1337,
        validFor: 'Mock Offer Delivery/Pick Up'
    }
    
    // Mock onclick: not relevant now
    const mockOnClick = () => { };

    const component = shallow(<OfferListItem itemoffer={mockOffer} onClick={mockOnClick} /> )
  
    it('should render name of propType offer', () => {
        expect(component.find('.offerName').contains(mockOffer.offer)).toBe(true);
    });

    it('should render price of propType offer', () => {
        expect(component.find('.offerPrice').contains(mockOffer.price)).toBe(true);
    });

    it('should render description of propType pizza', () => {
        expect(component.find('.offerValidFor').contains(mockOffer.validFor)).toBe(true);
    });

});