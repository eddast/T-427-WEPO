import React from "react";
import { shallow } from "enzyme";
import InitialPage from "./InitialPage";

jest.useFakeTimers();

// Initial page is a dummy component - i.e. no logic really
// It's only purpose is to contain the banner and nickname choice
describe("Initial Page Tests", () => {

  it("should contain banner and nickname choice", () => {
    const component = shallow(<InitialPage/>);
    expect(component.contains ('.pizzaBackground')).toBe(true);
  });

});