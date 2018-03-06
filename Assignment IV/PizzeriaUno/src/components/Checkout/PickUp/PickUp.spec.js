import React from "react";
import { shallow } from "enzyme";
import PickUp from "./PickUp";
import FromForPickup from "../PickUp/FormForPickUp/FormPickUp";
import NavigationBar from "../../NavigationBar/NavigationBar";

jest.useFakeTimers();

// PickUp component is a dummy component - i.e. no logic really
// It's only purpose is to contain the navigation bar, prompt and form
describe("Pick Up View", () => {

  it("should contain message prompt and form", () => {
    const component = shallow(<PickUp/>);
    expect(component.contains (<h1>Fill out your information</h1>)).toBe(true);
    expect(component.contains (<h2>We need your name and phone number to process your delicious order!</h2>)).toBe(true);
    expect(component.contains (<FromForPickup/>)).toBe(true);
    expect(component.contains (<NavigationBar/>)).toBe(true);
});

});