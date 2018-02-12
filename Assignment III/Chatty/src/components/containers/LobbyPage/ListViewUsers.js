import React from 'react';

class ListViewUsers extends React.Component {
    constructor(props, ctx) {
        super(props, ctx);
        this.server = this.props.server;
        this.server.setNickname('Edda');
        this.server.setNickname('Darri');
        this.server.setNickname('Sturla');
        this.userList = this.server.getUsers();
        this.userList.then((userList) => {
            console.log(userList);
        });
    }
    render() {
        return (
            <ul className='userList'>
            </ul>
        );
    };
};

export default ListViewUsers;