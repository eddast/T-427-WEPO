import React from "react";
import { shallow } from 'enzyme';
import NavigationBar from '../../NavigationBar/NavigationBar';
import AboutPageBody from '../AboutPageBody/AboutPageBody';
import AboutPageView from './AboutPageView';

jest.useFakeTimers();

// AboutPageView component is a dummy component - i.e. no logic really
// It's only purpose is to contain the navigation bar and AboutPageBody
describe('AboutPageView dummy render tests', () => {
  const component = shallow(<AboutPageView/>);

  it('should have a delicious pizza background', () => {
    expect(component.find('.pizzaBackground').length).toBe(1);
  });

  it('should contain the NavigationBar component', () => {
    expect(component.contains (<NavigationBar/>)).toBe(true);
  });

  it('should contain the AboutPageBody', () => {
    expect(component.contains (<AboutPageBody/>)).toBe(true);
  });

});