import React from "react";
import { mount, shallow } from "enzyme";
import PickUp from "./PickUp";
import FromForPickup from "../PickUp/FormForPickUp/FormPickUp";
import NavigationBar from "../../NavigationBar/NavigationBar";

jest.useFakeTimers();

// PickUp component is a dummy component - i.e. no logic really
// It's only purpose is to contain the navigation bar, prompt and form
describe("Pick Up view dummmy render tests", () => {
  const component = shallow(<PickUp />);

  it('should have a delicious pizza background', () => {
    expect(component.find('.pizzaBackground').length == 1).toBe(true);
  });

  it('should contain no explicit offer', () => {
    expect(component.state().offerSelected).toEqual(null);
  });

  it("should contain the NavigationBar component", () => {
    expect(component.contains (<NavigationBar />)).toBe(true);
  });

  it('should have message prompt and description', () => {
    expect(component.contains (<h1>Fill out your information</h1>)).toBe(true);
    expect(component.contains (<h2>We need your name and phone number to process your delicious order!</h2>)).toBe(true);
  });
  
  it('should contain pick up form', () => {
    expect(component.find('.customerForm').length == 1).toBe(true);
  });

});