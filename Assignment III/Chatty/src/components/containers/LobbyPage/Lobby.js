import React from 'react';
import ListViewChatRooms from './ListViewChatRooms';
import ListItemChatRooms from './ListItemChatRooms';
import ChatRoomWindow from './ChatRoomWindow';
import Banner from '../../Banner';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

class Lobby extends React.Component {
    
    constructor(props, ctx) {

        super(props, ctx);
        this.state = {
            userList : [],
            chatRoomList : [],
            selectedChatroom: null,
            showChatRoomAvailable : true,
            shouldreRender: false,
            displayModal: false,
            newChatroomName: '',
            newChatroomTopic: ''
        };
        this.server = this.context.serverAPI.server;
        this.server.joinChatroom('lobby');
        this.server.getChatrooms();
        this.server.listenToChatroomUpdates((chatRoomlist) => {
            this.setState({chatRoomList: chatRoomlist});
            this.setState({selectedChatroom: chatRoomlist[0]});
        });
    }

    addChatroomPrompt() {
        this.setState({displayModal: true});
    }

    updateNewChatroomName(evt) {
        this.setState({
            newChatroomName: evt.target.value
        });
    }

    updateNewChatroomTopic(evt) {
        this.setState({
            newChatroomTopic: evt.target.value
        });
    }

    closeModalAndAdd() {
        this.setState({displayModal: false});
        if(this.state.newChatroomName !== '') {
            this.server.addChatroom( this.state.newChatroomName, this.state.newChatroomTopic, (didSucceed) => {
                if(didSucceed) {
                    this.server.getChatrooms();
                    this.server.listenToChatroomUpdates((chatRoomlist) => {
                        this.setState({chatRoomList: chatRoomlist});
                    });
                }
            });
        }
    }

    selectChatroom (evt, chatroom) {
        this.setState({selectedChatroom: chatroom});
    }

    getMainLobbyBody() {
        return (
            <div>
                <Banner />
                <h2 id='lobbyGreeting'>Hello, {this.context.currentUser.userName}!</h2>
                <div className='LobbyBody'>
                    <div className='chatroomListDisplay'>
                        <ListViewChatRooms value={this.state.userList} addchatroom={() => this.addChatroomPrompt()}>
                            {this.state.chatRoomList.map((chatroom) => (<ListItemChatRooms onClick={evt => this.selectChatroom(evt, chatroom)} value={chatroom} info={chatroom}/>))}
                        </ListViewChatRooms>
                    </div>
                    <ChatRoomWindow chatroom={this.state.selectedChatroom}/>
                </div>
            </div>
        );
    }

    getAddChatroomModal() {
        return (
            <Modal className='addChatroomPrompt' isOpen={true} ariaHideApp={false} >
                <div className='row'>
                    <h1>Add Chatroom</h1>
                    <div className='col-md-10'>
                        <p>Chatroom Name:</p>
                        <input onChange={evt => this.updateNewChatroomName(evt)} type='text' className='form-control' placeholder='the Jedi Council'></input>
                    </div>
                    <div className='col-md-10'>
                        <p>Chatroom Topic:</p>
                        <input onChange={evt => this.updateNewChatroomTopic(evt)} type='text'className='form-control'placeholder='The High Ground'></input>
                    </div>
                </div>
                <div className='row'>
                    <button onClick={() => this.closeModalAndAdd()}>Create</button>
                </div>
            </Modal>
        );
    }

    render() {
        if(this.state.displayModal) {
            return (
                <div>
                    {this.getMainLobbyBody()}
                    {this.getAddChatroomModal()}
                </div>
            );
        }

        return this.getMainLobbyBody();
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
    }),

    currentUser: PropTypes.shape({
        userName: PropTypes.string
    })
};


export default Lobby;