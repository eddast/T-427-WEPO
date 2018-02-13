import React from 'react';
import ListViewChatRooms from './ListViewChatRooms';
import ListItemChatRooms from './ListItemChatRooms';
import ChatRoomWindow from './ChatRoomWindow';
import Banner from '../../Banner'
import PropTypes from 'prop-types'

class Lobby extends React.Component {
    
    constructor(props, ctx) {

        super(props, ctx);
        this.state = {
            userList : [],
            chatRoomList : [],
            selectedChatroom: null,
            showChatRoomAvailable : true,
            shouldreRender: false
        };
        this.server = this.context.serverAPI.server;
        this.server.getChatrooms();
        this.server.listenToChatroomUpdates((chatRoomlist) => {
            this.setState({chatRoomList: chatRoomlist});
            this.setState({selectedChatroom: chatRoomlist[0]});
        });
    }

    addChatroom() {
        this.server.addChatroom('f09wejfoiwejfoiwejf', 'mock topic', (didSucceed) => {
            if(didSucceed) {
                this.server.getChatrooms();
                this.server.listenToChatroomUpdates((chatRoomlist) => {
                    this.setState({chatRoomList: chatRoomlist});
                });
            }
        });
    }

    selectChatroom (evt, chatroom) {
        this.setState({selectedChatroom: chatroom});
    }

    render() {
        return (
            <div>
                <Banner />
                <div className='LobbyBody'>
                    <div className='chatroomListDisplay'>
                        <ListViewChatRooms value={this.state.userList} addchatroom={() => this.addChatroom()}>
                            {this.state.chatRoomList.map((chatroom) => (<ListItemChatRooms onClick={evt => this.selectChatroom(evt, chatroom)} value={chatroom} info={chatroom}/>))}
                        </ListViewChatRooms>
                    </div>
                    <ChatRoomWindow chatroom={this.state.selectedChatroom}/>
                </div>
            </div>
        );
    };
}

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