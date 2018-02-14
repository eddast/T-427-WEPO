import React from 'react';
import FontAwesome from 'react-fontawesome';

// Renders a cell in user list view
// Has an icon indicating user is online and user name
const ListItemUsers = ({ name }) => {
    return (
        <li className='userListItem'>
            <FontAwesome className="col-" id='onlineIcon' name='user'/>
            <p id='userName'>{name}</p>
        </li>
    );
};

export default ListItemUsers;