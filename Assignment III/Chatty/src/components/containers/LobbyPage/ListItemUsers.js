import React from 'react';
import FontAwesome from 'react-fontawesome';

// Renders a cell in user list view
// Has an icon indicating user is online and user name
const ListItemUsers = ({ name, sendPrivateMessage }) => {
    return (
        <li className='row userListItem'>
            <span className='col-md-8'>
                <FontAwesome id='onlineIcon' name='user'/>
                <p id='userName'>{name}</p>
            </span>
            <span className='col-md-4' id='privateMessageToolTip'>
                <FontAwesome onClick={() => sendPrivateMessage(name)} id='privateMessageIcon' name='envelope'/>
                <span className='toolTipText'>Private Message</span>
            </span>
        </li>
    );
};

export default ListItemUsers;