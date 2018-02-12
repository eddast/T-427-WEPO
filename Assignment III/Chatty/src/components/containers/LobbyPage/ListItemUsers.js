import React from 'react';
// import Logo from '../../../resources/Icon.svg';

const ListItemUsers = ({ name }) => {
    return (
        <li className="userListItem">
            <p id="userName">{name}</p>
            <p id="userActive">Active now</p>
            {/* <Logo id='messageUserLogo' width={40} height={40}/> */}
        </li>
    );
};

export default ListItemUsers;