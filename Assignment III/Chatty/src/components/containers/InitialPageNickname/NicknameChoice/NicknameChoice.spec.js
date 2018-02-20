import React from "react";
import { shallow } from "enzyme";
import NicknameChoice from "./NicknameChoice";
import { SocketIO, Server } from "mock-socket";
import Service from '../../../../services/API';
import { Redirect } from 'react-router';

jest.useFakeTimers();

describe("Nickname Prompt Tests", () => {

  // Create mock server and socket
  let mockSocketServer = new Server("http://localhost:8080");
  let mockSocket = SocketIO.connect("http://localhost:8080");

  // Tests whether input value updates correctly
  it("Update Input Value", () => {
    const server = Service;
    server.connect();
    const context = {
      serverAPI : {
        server: server
      },
      routeTools : {
        redirect: Redirect
      }
    }
    const component = shallow(<NicknameChoice/>, { context });
    console.log(component.find('.inputNickname'));
    component.find('input').simulate('change', {target: {value: 'nickname'}});
    expect(component.state().inputValue).toEqual('nickname');
  });

  // Destroy mock server and socket
  afterEach(() => {
    mockSocketServer.stop();
    mockSocket.close();
  });


});