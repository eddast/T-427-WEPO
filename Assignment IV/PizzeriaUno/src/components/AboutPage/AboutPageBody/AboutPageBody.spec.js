import React from 'react';
import { shallow } from 'enzyme';
import AboutPageBody from './AboutPageBody';

jest.useFakeTimers();

// AboutPageBody component is a dummy component - i.e. no logic really
// It's only purpose is to contain the about information
describe('AboutPageBody dummy render tests', () => {
    const component = shallow(<AboutPageBody/>);

    it('contains restaurant description', () => {
        expect(component.find('.description').length).toBe(1);
    });

    it('contains chef image', () => {
        expect(component.find('#chefs').length).toBe(1);
    });

    // MOST INPORTANT TEST OF ALL
    it('contains inpizzawecust tagline', () => {
        expect(component.find('#inPizzaWeCrust').length).toBe(1);
    });

});