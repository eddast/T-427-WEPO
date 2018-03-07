import React from "react";
import { shallow } from 'enzyme';
import NavigationBar from '../../NavigationBar/NavigationBar';
import ConfirmOrder from './ConfirmOrder';
import Loader from '../../../resources/PizzeriaUno.png';

jest.useFakeTimers();

// ConfirmOrder component is a dummy component - i.e. no logic really
// It's only purpose is to contain the navigation bar and an explicit confirmation message
describe('ConfirmOrder dummy render tests', () => {
  const component = shallow(<ConfirmOrder/>);

  it('should have a delicious pizza background', () => {
    expect(component.find('.pizzaBackground').length).toBe(1);
  });

  it('should contain the NavigationBar component', () => {
    expect(component.contains (<NavigationBar/>)).toBe(true);
  });

  it('should notify user pizza is going in oven', () => {
    expect(component.find('.confirmationBody').contains('PIZZA IS GOING IN THE OVEN ')).toBe(true);
  });

  it('should exite user about his or her pizza!', () => {
    expect(component.find('.confirmationBody').contains('In just a couple of minutes you\'ll get your promised italian gourmet feast!')).toBe(true);
  });

  it('should tell user pizza is loading', () => {
    expect(component.find('.confirmationBody').contains('Loading pizza...')).toBe(true);
  });

  it('should display a loading image to indicate pizza progress', () => {
    expect(component.find('#loadImage').filterWhere((item) => {
        return item.prop('src') === Loader;
    }).length==1).toBe(true);
  });

});