import React from 'react';
import ListViewUsers from './ListViewUsers';
import ListItemUsers from './ListItemUsers';
import Banner from '../../Banner'
import PropTypes from 'prop-types'

class Lobby extends React.Component {
    
    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            userList : []
        };
        this.server = this.context.serverAPI.server;
        this.server.getUsers().then((userList) => {
            this.setState({userList: userList});
        });
    }

    render() {
        console.log('Hello, can you see me');
        return (
            <div>
                <Banner />
                <div className='LobbyBody'>
                    <ListViewUsers value={this.state.userList}>
                        {this.state.userList.map((user) => (<ListItemUsers name={user}/>))}
                    </ListViewUsers>
                </div>
            </div>
        );
    };
};

Lobby.contextTypes = {

    routeTools: PropTypes.shape({
        router: PropTypes.component,
        route: PropTypes.component,
        redirect: PropTypes.component,
    }),
    
    serverAPI: PropTypes.shape({
        server: PropTypes.component
    })
};


export default Lobby;