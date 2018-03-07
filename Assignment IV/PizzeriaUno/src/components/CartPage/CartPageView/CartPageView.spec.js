import React from "react";
import { shallow } from 'enzyme';
import NavigationBar from '../../NavigationBar/NavigationBar';
import CartPageBody from '../CartPageBody/CartPageBody';
import CartPageView from './CartPageView';

jest.useFakeTimers();

// CartPageView component is a dummy component - i.e. no logic really
// It's only purpose is to contain the navigation bar and CartPageBody
describe('CartPageView dummy render tests', () => {
  const component = shallow(<CartPageView/>);

  it('should have a delicious pizza background', () => {
    expect(component.find('.pizzaBackground').length).toBe(1);
  });

  it('should contain the NavigationBar component', () => {
    expect(component.contains (<NavigationBar/>)).toBe(true);
  });

  it('should contain the AboutPageBody', () => {
    expect(component.contains (<CartPageBody/>)).toBe(true);
  });

});