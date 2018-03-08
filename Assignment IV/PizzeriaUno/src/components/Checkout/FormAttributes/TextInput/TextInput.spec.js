import React from 'react';
import { shallow } from 'enzyme';
import TextInput from './TextInput';

jest.useFakeTimers();

// TextInput component is a dummy component - i.e. no logic really except for logic passed to it
// It's only purpose is to contain the navigation bar and an explicit confirmation message
describe('ConfirmOrder dummy render tests', () => {

    // Mock context
    const mockType = 'number';
    const mockLabel = 'Mock Label';
    const mockName = 'Mock name';
    const mockValue = '1337';
    const mockValidationMessage = 'Mock Validation Message';
    const mockOnChange = () => { }
    const mockValidate = () => { return mockValidationMessage; }

    const component = shallow(<TextInput label={mockLabel} onChange={mockOnChange} name={mockName} value={mockValue} type={mockType} validate={mockValidate}/>);

    it('should have type provided and none other', () => {
        expect(component.find('input[type="' + mockType + '"]' ).length).toBe(1);
        expect(component.find('input[type="text"]' ).length).toBe(0);
    });

    it('should have name provided', () => {
        expect(component.find('input[type="' + mockType + '"]').filterWhere((item) => {
            return item.prop('name') === mockName;
        }).length==1).toBe(true);
    });

    it('should contain correct label', () => {
        expect(component.find('label').contains(mockLabel)).toBe(true);
    });

    it('should have value provided', () => {
        expect(component.find('input[type="' + mockType + '"]').filterWhere((item) => {
            return item.prop('value') === mockValue;
        }).length==1).toBe(true);
    });

    it('should display validate message as validate function determines', () => {
        expect(component.find('.formErrorText').contains(mockValidationMessage)).toBe(true);
    });

});