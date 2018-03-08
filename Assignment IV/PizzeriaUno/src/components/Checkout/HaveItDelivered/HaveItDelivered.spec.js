import React from 'react';
import { shallow } from 'enzyme';
import HaveItDelivered from './HaveItDelivered';
// import DeliveryForm from './FormForDelivery/FormForDelivery';
import NavigationBar from '../../NavigationBar/NavigationBar';

jest.useFakeTimers();

// HaveItDelivered component is a dummy component - i.e. no logic really
// It's only purpose is to contain the navigation bar, prompt and form
describe('Delivery view dummy render test', () => {
    const component = shallow(<HaveItDelivered/>);

    it('should have a delicious pizza background', () => {
        expect(component.find('.pizzaBackground').length).toBe(1);
    });

    it('should contain no explicit offer', () => {
        expect(component.state().offerSelected).toEqual(null);
    });

    it('should contain the NavigationBar component', () => {
        expect(component.contains (<NavigationBar/>)).toBe(true);
    });

    it('should have message prompt and description', () => {
        expect(component.contains (<h1>Fill out your information</h1>)).toBe(true);
        expect(component.contains (<h2>Please provide accurate information on address so that the pizza will not get lost!</h2>)).toBe(true);
    });

    it('should contain delivery form', () => {
        expect(component.find('.customerForm').length >= 1).toBe(true);
    });

});