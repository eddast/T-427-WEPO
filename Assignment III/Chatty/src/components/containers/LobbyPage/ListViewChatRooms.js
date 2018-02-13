import React from 'react';
import FontAwesome from 'react-fontawesome';

const ListViewChatRooms = ({ children }) => {
    return (
        <div className='chatroomsActiveList'>
            <div>
                <span id='ListViewChatroomHeading'>CHATROOMS ACTIVE</span>
                <span id='addRoomToolTip'>
                    <FontAwesome id='addRoomIcon' aria-hidden='false' name='plus'/>
                    <span className='toolTipText'>New chatroom</span>
                </span>
            </div>
            <ul className='listViewChatroom'>{children}</ul>
        </div>
    );
};

// ListViewChatRooms.contextTypes = {
    
//     serverAPI: PropTypes.shape({
//         server: PropTypes.component
//     })
// };

export default ListViewChatRooms;
