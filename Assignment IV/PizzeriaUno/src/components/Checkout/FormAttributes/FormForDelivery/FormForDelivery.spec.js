import React from 'react';
import { shallow } from 'enzyme';
import FormForDelivery from './FormForDelivery';

jest.useFakeTimers();

// Home page is a dummy component - i.e. no logic really
// It's purpose is to display a proptype pizza
describe('Cart Item render appropriate values for pizza tests', () => {

    //Create a mock address for testing purposes
    const mockAdress = {
        name: 'Sól 117',
        address: 'Sól 117',
        city: 'Reykjavík',
        telephone: '114',
        postalCode: '112',
        toConfirmation : false,
        customer: null,
        offerSelected: null
    }

    const component = shallow(<FormForDelivery address={mockAdress} />);

    it('Should accept telephone', () => {
        var str = component.validateTelephone(mockAdress.telephone);
        expect(str).toBe('');
        // expect(42).toBe(42);
    });
});