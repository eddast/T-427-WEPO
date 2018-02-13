import React from 'react';

const ListViewUsers = ({ children}) => {
    return (
        <div className="usersActiveList">
            <p id="ListViewUsersHeading">USERS ACTIVE</p>
            <ul className="listViewUsers">{children}</ul>
        </div>
    );
};

export default ListViewUsers;