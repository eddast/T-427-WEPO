import React from 'react';
import { shallow } from 'enzyme';
import InitialPage from './HomePage';

jest.useFakeTimers();

// Home page is a dummy component - i.e. no logic really
// It's only purpose is to contain necessary visual things
describe('Home Page dummy render tests', () => {

  describe('should render background, greeting, logo and options', () => {
    const component = shallow(<InitialPage />);

    it('should have a delicious pizza background', () => {
      expect(component.find('.pizzaBackground').length == 1).toBe(true);
    });

    it('should greet the newbie user', () => {
      expect(component.find('#greeting').length == 1).toBe(true);
    });

    it('should contain restaurant logo and the correct tagline', () => {
      expect(component.find('#logo').length == 1).toBe(true);
      expect(component.contains (<h2 id='tagline'>"Love at first bite"</h2>)).toBe(true);
    });

    it('should contain the option bar and all options', () => {
      expect(component.find('.optionBar').length == 1).toBe(true);
      expect(component.find('#menuOption').length == 1).toBe(true);
      expect(component.find('#offersOption').length == 1).toBe(true);
      expect(component.find('#cartOption').length == 1).toBe(true);
      expect(component.find('#aboutUsOption').length == 1).toBe(true);
      expect(component.find('#orderOption').length == 1).toBe(true);
    });

    it('should have correct links bound to options', () => {

      // Menu option should direct to /pizzas
      expect(component.find('#menuOption').filterWhere((item) => {
        return item.prop('href') === '/pizzas';
      }).length==1).toBe(true);

      // Offer option should direct to /offers
      expect(component.find('#offersOption').filterWhere((item) => {
        return item.prop('href') === '/offers';
      }).length==1).toBe(true);

      // Cart option should direct to /cart
      expect(component.find('#cartOption').filterWhere((item) => {
        return item.prop('href') === '/cart';
      }).length==1).toBe(true);

      // about option should direct to /about
      expect(component.find('#aboutUsOption').filterWhere((item) => {
        return item.prop('href') === '/about';
      }).length==1).toBe(true);

      // about option should direct to /about
      expect(component.find('#orderOption').filterWhere((item) => {
        return item.prop('href') === '/order';
      }).length==1).toBe(true);

    });
  
  });

});