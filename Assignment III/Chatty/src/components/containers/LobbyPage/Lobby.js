import React from 'react';
import ListViewUsers from './ListViewUsers';
import ListItemUsers from './ListItemUsers';
import Banner from '../../Banner'
import PropTypes from 'prop-types'

class Lobby extends React.Component {
    
    constructor(props, ctx) {

        super(props, ctx);
        this.state = {
            userList : [],
            chatRoomList : []
        };
        this.server = this.context.serverAPI.server;
        this.server.getUsers();
        this.server.listenToUserUpdates((userlist)=> {
            this.setState({userList: userlist});
        });
        this.server.getChatrooms();
        this.server.listenToChatroomUpdates((chatRoomlist) => {
            this.setState({chatRoomList: chatRoomlist});
        });
    }

    render() {
        return (
            <div>
                <Banner />
                <div className='LobbyBody'>
                    <ListViewUsers value={this.state.userList}>
                        {this.state.userList.map((user) => (<ListItemUsers name={user}/>))}
                    </ListViewUsers>
                    {/* <ListViewChatRooms value={this.state.userList}>
                        {this.state.chatRoomList.map((chatroom) => (<ListItemChatRooms name={chatroom}/>))}
                    </ListViewChatRooms> */}
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