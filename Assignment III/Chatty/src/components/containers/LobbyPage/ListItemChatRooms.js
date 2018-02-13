import React from 'react';
import FontAwesome from 'react-fontawesome';

const ListItemChatRooms = ({ name }) => {
    return (
        <li className='chatroomListItem'>
            <FontAwesome className="col-" id='chatroomIcon' aria-hidden='false' name='comments'/>
            <div className="col-">
                <p id='chatroomName'>{name}</p>
            </div>
        </li>
    );
};

export default ListItemChatRooms;