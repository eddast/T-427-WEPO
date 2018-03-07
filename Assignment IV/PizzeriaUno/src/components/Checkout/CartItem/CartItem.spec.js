import React from 'react';
import { shallow } from 'enzyme';
import CartItem from './CartItem';

jest.useFakeTimers();

// Home page is a dummy component - i.e. no logic really
// It's purpose is to display a proptype pizza
describe('Cart Item render appropriate values for pizza tests', () => {

    // Create a mock pizza for testing purposes
    const mockPizza = {
        name: 'Mock Pizza',
        description: 'Mock Pizza Description',
        price: 1337,
        image: 'null'
    }

    const component = shallow(<CartItem pizza={mockPizza} /> )

    it('should render image of propType pizza with pizza name as alt', () => {
        expect(component.find('.pizzaImg').filterWhere((item) => {
          return item.prop('src') === mockPizza.image;
        }).length==1).toBe(true);
  
        expect(component.find('.pizzaImg').filterWhere((item) => {
          return item.prop('alt') === mockPizza.name;
        }).length==1).toBe(true);
  
    });
  
    it('should render name of propType pizza', () => {
        expect(component.find('.pizzaName').contains(mockPizza.name)).toBe(true);
    });

    it('should render description of propType pizza', () => {
        expect(component.find('.pizzaDescription').contains(mockPizza.description)).toBe(true);
    });

    it('should render price of propType pizza', () => {
        expect(component.find('.pizzaPrice').contains(mockPizza.price)).toBe(true);
    });

});