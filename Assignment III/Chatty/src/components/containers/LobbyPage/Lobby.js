import React from 'react';
import ListViewChatRooms from './ListViewChatRooms';
import ListItemChatRooms from './ListItemChatRooms';
import ChatRoomWindow from './ChatRoomWindow';
import Banner from '../../Banner';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import PrivateMessageModal from './PrivateMessageModal';

class Lobby extends React.Component {
    
    constructor(props, ctx) {

        super(props, ctx);

        // Lobby states
        this.state = {
            userList : [],
            chatRoomList : [],
            selectedChatroom: null,
            showChatRoomAvailable : true,
            shouldreRender: false,
            displayModal: false,
            newChatroomName: '',
            newChatroomTopic: '',
            isSendingPrivateMessage: false,
            privateMessageTo: null,
            firstPrivateMessageRecieved: ''
        };
        
        // User is initially joined to the lobby chatroom
        // Get list of active chatroom to render
        this.server = this.context.serverAPI.server;
        this.server.joinChatroom('lobby');
        this.server.getChatrooms();
        this.server.listenToChatroomUpdates((chatRoomlist) => {
            this.setState({chatRoomList: chatRoomlist});
            this.setState({selectedChatroom: chatRoomlist[0]});
        });
        this.sendPrivateMessage = this.sendPrivateMessage.bind(this);
        this.closePrivateChatroom = this.closePrivateChatroom.bind(this);
        this.server.listenToPrivateMessage((username, message) => {
            this.handlePrivateMessageListen(username, message);
        });
    }

    // Sets display modal to true, triggering a re-render
    // with the add-chatroom modal displayed
    addChatroomPrompt() {
        this.setState({displayModal: true});
    }

    // Updates chatroom name input value constantly
    updateNewChatroomName(evt) {
        this.setState({
            newChatroomName: evt.target.value
        });
    }

    // Updates chatroom topic input value constantly
    updateNewChatroomTopic(evt) {
        this.setState({
            newChatroomTopic: evt.target.value
        });
    }

    handlePrivateMessageListen(username, message) {
        if(message !== 'left the conversation') {
            this.setState({
                isSendingPrivateMessage : true,
                privateMessageTo: username,
                firstPrivateMessageRecieved: message
            });
        }
    }

    // Closes add chatroom modal and if user provided info,
    // a new chatroom is added to the list of chatrooms
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

    // On chatroom select, user parts the room he's in
    // and joins the new selected room
    // Then chatroom rendered by ChatroomWindow component
    // is changed to render a the new room
    selectChatroom (evt, chatroom) {
        var currentRoom = this.state.selectedChatroom.name;
        var newRoom = chatroom.name;
        this.server.partChatroom(currentRoom);
        this.server.joinChatroom(newRoom);
        this.setState({selectedChatroom: chatroom});
        this.refs.window.swapChatrooms(chatroom);
    }

    // Triggers display of private chatroom modal between two users
    sendPrivateMessage (user) {
        this.setState({
            isSendingPrivateMessage: true,
            privateMessageTo: user
        });
        // this.setState({privateMessageTo: user});
    }

    // Closes private chatroom modal between two users
    closePrivateChatroom() {
        this.setState({
            isSendingPrivateMessage: false,
            privateMessageTo: null
        });
        // this.setState({privateMessageTo: null});
    }

    // JSX for main lobby body including banner, list of chatrooms,
    // and the chatroom window displaying selected chatroom
    getMainLobbyBody() {
        if(this.state.selectedChatroom) {
            var currentUser = this.props.location.currentUser && this.props.location.currentUser.referrer;
            return (
                <div>
                    <Banner key='banner'/>
                    <h2 id='lobbyGreeting'>Hello, {currentUser}!</h2>
                    <div className='LobbyBody'>
                        <div className='chatroomListDisplay'>
                            <ListViewChatRooms key='chatrooms' value={this.state.userList} addchatroom={() => this.addChatroomPrompt()}>
                                {this.state.chatRoomList.map((chatroom) => (<ListItemChatRooms key={chatroom.name} onClick={evt => this.selectChatroom(evt, chatroom)} value={chatroom} info={chatroom}/>))}
                            </ListViewChatRooms>
                        </div>
                        <ChatRoomWindow sendPrivateMessage={this.sendPrivateMessage} key='window' ref='window' currentUser={currentUser} chatroom={this.state.selectedChatroom}/>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <h1>Our pigeon lost your messages in transit!</h1>
                <h3>To help guide our pigeons, check:</h3>
                <ul>
                    <li>Are you even logged in, bruf?</li>
                    <li>Is your server running, bruf?</li>
                    <li>Is your computer on, bruf?</li>
                </ul>
            </div>
        );
    }

    // JSX for add chatroom modal
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

    // Renders view
    // If add chatroom modal should be displayed it does
    // Otherwise just the main body is displayed
    render() {
        if(this.state.displayModal) {
            return (
                <div>
                    {this.getMainLobbyBody()}
                    {this.getAddChatroomModal()}
                </div>
            );
        } else if(this.state.isSendingPrivateMessage) {
            return (
                <div>
                    {this.getMainLobbyBody()}
                    <PrivateMessageModal firstMessage={this.state.firstPrivateMessageRecieved} key='privatemessage' closePrivateChatroom={this.closePrivateChatroom} toUser={this.state.privateMessageTo}/>
                </div>
            );
        }

        return this.getMainLobbyBody();
    };
}

// Variables lobby needs from parent context
Lobby.contextTypes = {

    routeTools: PropTypes.shape({
        redirect: PropTypes.component,
    }),
    
    serverAPI: PropTypes.shape({
        server: PropTypes.component
    }),

    currentUser: PropTypes.shape({
        userName: PropTypes.string
    }),
};


export default Lobby;