import React from 'react';
import FontAwesome from 'react-fontawesome';

const ListItemChatRooms = ({ info }) => {
    const { name, topic } = info;
    return (
        <li className='chatroomListItem'>
            <FontAwesome className="col-" id='chatroomIcon' aria-hidden='false' name='comments'/>
            <div className="col-">
                <p id='chatroomName'>{name}</p>
                <p id='chatroomTopic'>{topic}</p>
            </div>
        </li>
    );
};

export default ListItemChatRooms;