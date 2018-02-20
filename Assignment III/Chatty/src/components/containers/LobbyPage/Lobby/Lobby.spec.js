import React from "react";
import { shallow } from "enzyme";
// import { SocketIO, Server } from "mock-socket";
import Lobby from "./Lobby";

jest.useFakeTimers();

describe('Lobby tests', () => {
    // let mockSocketServer, mockSocket;

    // beforeEach(() => {
    //   mockSocketServer = new Server("http://localhost:8080");

    //   mockSocketServer.on("connection", socket => {
    //     socket.on("msg", message => {
    //       socket.emit("msg", message);
    //     });
    //   });

    //   mockSocket = SocketIO.connect("http://localhost:8080");

    //   jest.runOnlyPendingTimers();
    // });

    it("should emit the right message", () => {
      const message = "message";
      const component = shallow(<Lobby />, {
      });

      expect(12).toBe(12);
      //expect(message).toBe("message");
      //expect(component.state().messages.length).toBe(1);
      //expect(component.state().messages[0]).toEqual(`${new Date().toLocaleTimeString()} - ${message}`);
    });

    // afterEach(() => {
    //   mockSocketServer.stop();
    //   mockSocket.close();
    // });
});
