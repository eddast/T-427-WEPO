import React from 'react';
import FontAwesome from 'react-fontawesome';

const ListItemUsers = ({ name }) => {
    return (
        <li className='userListItem'>
            <FontAwesome className="col-" id='onlineIcon' aria-hidden='false' name='user'/>
            <div className="col-">
                <p id='userName'>{name}</p>
            </div>
        </li>
    );
};

export default ListItemUsers;