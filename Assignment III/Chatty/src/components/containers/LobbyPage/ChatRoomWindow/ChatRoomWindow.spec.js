import React from "react";
import { shallow } from "enzyme";
// import { SocketIO, Server } from "mock-socket";
import ChatRoomWindow from "./ChatRoomWindow";

jest.useFakeTimers();

describe("List Item tests", () => {
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

  it("should be 12", () => {
    // const component = shallow(<ChatRoomWindow />, {});

    expect(12).toBe(12);
  });

  // afterEach(() => {
  //   mockSocketServer.stop();
  //   mockSocket.close();
  // });
});
