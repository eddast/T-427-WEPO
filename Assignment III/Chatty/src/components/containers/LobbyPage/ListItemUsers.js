import React from 'react';
import FontAwesome from 'react-fontawesome';

const ListItemUsers = ({ name }) => {
    return (
        <li className='userListItem'>
            <FontAwesome className="col-" id='onlineIcon' name='user'/>
            <p id='userName'>{name}</p>
        </li>
    );
};

export default ListItemUsers;