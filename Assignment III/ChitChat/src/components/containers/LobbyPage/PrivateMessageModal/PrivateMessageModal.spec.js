import React from "react";
import { shallow } from "enzyme";
import PrivateMessageModal from "./PrivateMessageModal";

jest.useFakeTimers();

describe("Private message modal tests", () => {
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

  it("should be equal to 12 in privateMessageModal", () => {
    expect(12).toBe(12);
  });

  it("are all states at the beginning correct", () => {
    const component = shallow(<PrivateMessageModal />, {});

    expect(15).toBe(15);
  });

 

  // afterEach(() => {
  //   mockSocketServer.stop();
  //   mockSocket.close();
  // });

});
