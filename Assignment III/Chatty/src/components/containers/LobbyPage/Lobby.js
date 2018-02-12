import React from 'react';
import ListViewUsers from './ListViewUsers';
import ListItemUsers from './ListItemUsers';



class Lobby extends React.Component {
    
    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            userList : []
        };
        this.server = this.props.server;
        this.server.setNickname('Edda');
        this.server.setNickname('Darri');
        this.server.setNickname('Sturla');
        this.server.getUsers().then((userList) => {
            this.setState({userList: userList});
        });
    }

    render() {

        return (
            <div className='LobbyBody'>
                <ListViewUsers value={this.state.userList}>
                    {this.state.userList.map((user) => (<ListItemUsers name={user}/>))}
                </ListViewUsers>
            </div>
        );
    };
};

export default Lobby;