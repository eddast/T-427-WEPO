import React from 'react';
import { shallow } from 'enzyme';
import LoadingScreen from './LoadingScreen';
import Loader from '../../resources/PizzeriaUno.png';

jest.useFakeTimers();

// Menu page view is a dummy component - i.e. no logic really
// It's only purpose is to contain necessary visual things
describe('Loading view dummy render tests', () => {

  describe('should render background, load image as the logo and loading message', () => {
    const component = shallow(<LoadingScreen />);

    it('should have a delicious pizza background', () => {
      expect(component.find('.pizzaBackground').length == 1).toBe(true);
    });

    it('should render logo as image', () => {
        expect(component.find('#loadImage').filterWhere((item) => {
          return item.prop('src') === Loader;
        }).length==1).toBe(true);
    });

    it('should contain correct loading message', () => {
        expect(component.contains(<h1 id='loadingMessage'>Getting pizzas ready...</h1>)).toBe(true);
    });
  
  });

});