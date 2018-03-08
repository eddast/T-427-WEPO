import React from 'react';
import { shallow } from 'enzyme';
// import { Router, Route } from 'react-router';
import CheckoutPageView from './CheckoutPageView';
import NavigationBar from '../../NavigationBar/NavigationBar';

jest.useFakeTimers();

// CheckoutPageView is a dummy component - i.e. no logic really
// It's only purpose is to contain necessary visual things
describe('CheckoutPageView dummy render tests', () => {

    describe('should render background, navbar, correct message prompt, and two links (delivery and pickup links)', () => {
        const component = shallow(<CheckoutPageView />);

        it('should have a delicious pizza background', () => {
            expect(component.find('.pizzaBackground').length == 1).toBe(true);
        });

        it('should have a delicious pizza background', () => {
            expect(component.contains(<NavigationBar />)).toBe(true);
        });

        it('should render two delivery options, pickup and delivery', () => {
            expect(component.find('.showOptionsForCheckoutText').contains('Delivery')).toBe(true);
            expect(component.find('.showOptionsForCheckoutText').contains('Pick Up')).toBe(true);
        });

        // TODO test link
        it('should redirect to /checkout/delivery when clicked on delivery link', () => {
            expect(component.find('#deliveryLink').length==1).toBe(true);
        });

        // TODO test link
        it('should redirect to /checkout/pickup when clicked on pickup link', () => {
            expect(component.find('#pickupLink').length==1).toBe(true);
        });
    });
});