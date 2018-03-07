import React from 'react';
import { shallow } from 'enzyme';
import OfferSelectionListItem from './OfferSelectionListItem';

jest.useFakeTimers();

// OfferSelectionListItem is a dummy component - i.e. no logic really
// It's purpose is to display a proptype pizza
describe('OfferSelectionListItem render appropriate values for pizza tests', () => {

    // Create a mock pizza for testing purposes
    const mockPizza = {
        name: 'Mock Pizza',
        description: 'Mock Pizza Description',
        price: 1337,
        image: 'null'
    }

    // Mock two selected functions due to different render:
    // One returns true for selected, the other false for unselected
    const mockSelected = () => { return true; }
    const mockUnselected = () => { return false; }

    // mock onclick func to satify req proptypes: not relevant for testing this component
    const mockOnClick = () => { }

    // mock max const to satify req proptypes: not relevant for testing this component
    const max = 1337;

    const componentSelected = shallow(<OfferSelectionListItem pizza={mockPizza} isSelected={mockSelected} onClick={mockOnClick} max={max} />)
    const componentUnselected = shallow(<OfferSelectionListItem pizza={mockPizza} isSelected={mockUnselected} onClick={mockOnClick} max={max} />)

    it('should notify with icon that component is selected, not if it isnt', () => {
        expect(componentSelected.find('.offerCheck').length==1).toBe(true);
        expect(componentUnselected.find('.offerCheck').length==1).toBe(false);
    });
  
    it('both selected and unselected components should render name of propType pizza', () => {
        expect(componentSelected.find('.pizzaName').contains(mockPizza.name)).toBe(true);
        expect(componentUnselected.find('.pizzaName').contains(mockPizza.name)).toBe(true);
    });

    it('both selected and unselected components should render description of propType pizza', () => {
        expect(componentSelected.find('.pizzaDes').contains(mockPizza.description)).toBe(true);
        expect(componentUnselected.find('.pizzaDes').contains(mockPizza.description)).toBe(true);
    });

    it('both selected and unselected components should render price of propType pizza', () => {
        expect(componentSelected.find('.pizzaPrice').contains(mockPizza.price)).toBe(true);
        expect(componentUnselected.find('.pizzaPrice').contains(mockPizza.price)).toBe(true);
    });

});