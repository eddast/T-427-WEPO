import React from 'react';
import { shallow } from 'enzyme';
import OfferPageView from './OfferPageView';
import OfferPageBody from '../OfferPageBody/OfferPageBody';
import NavigationBar from '../../NavigationBar/NavigationBar';

jest.useFakeTimers();

// Menu page view is a dummy component - i.e. no logic really
// It's only purpose is to contain necessary visual things
describe('Menu Page view dummy render tests', () => {

  describe('should render background, navbar and offer page body', () => {
    const component = shallow(<OfferPageView />);

    it('should have a delicious pizza background', () => {
      expect(component.find('.pizzaBackground').length == 1).toBe(true);
    });

    it('should contain navbar', () => {
      expect(component.contains (<NavigationBar />)).toBe(true);
    });

    it('should contain navbar', () => {
        expect(component.contains (<OfferPageBody />)).toBe(true);
    });
  
  });

});