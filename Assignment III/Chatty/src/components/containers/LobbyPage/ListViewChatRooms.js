import React from 'react';
import FontAwesome from 'react-fontawesome';

const ListViewChatRooms = ({ children }) => {
    return (
        <div className="chatroomsActiveList">
            <div>
                <p id="ListViewChatroomHeading">CHATROOMS ACTIVE <FontAwesome id='addRoomIcon' aria-hidden='false' name='plus'/></p>
            </div>
            <ul className='listViewChatroom'>{children}</ul>
        </div>
    );
};

export default ListViewChatRooms;
