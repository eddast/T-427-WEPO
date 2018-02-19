import React from 'react';
import FontAwesome from 'react-fontawesome';

// Renders a cell in chatroom list
// Each cell has an on click event in parent
// Displays name and topic of chatroom
const ListItemChatRooms = ({ currentUser, onClick, info }) => {
    const { banned, name, topic } = info;
    console.log(banned);
    console.log(currentUser);
    if(banned[currentUser] === undefined) {
        return (
            <li onClick={onClick} className='chatroomListItem'>
                <FontAwesome className='col-' id='chatroomIcon' aria-hidden='false' name='comments'/>
                <div className='col-'>
                    <p id='chatroomName'>{name}</p>
                    <p id='chatroomTopic'>{topic}</p>
                </div>
            </li>
        );
    }
    return <div/>;
};

export default ListItemChatRooms;