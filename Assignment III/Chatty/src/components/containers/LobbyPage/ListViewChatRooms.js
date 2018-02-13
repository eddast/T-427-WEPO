import React from "react";

const ListViewChatRooms = ({ children }) => {
  return <div>
      <div class="eachAndEveryChatRoom" onClick={evt => this.switchViews(evt)}>
        <p class="nameOfTheChatRoomBox">{children}</p>
      </div>;
      <div class="emptySpaceBetweenChatRooms" />
    </div>;
};

export default ListViewUsers;
