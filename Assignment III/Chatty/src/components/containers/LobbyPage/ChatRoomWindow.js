import React from 'react';
import ListViewUsers from './ListViewUsers';
import ListItemUsers from './ListItemUsers';
import PropTypes from 'prop-types';

// Renders the view on a chatroom window
// Provides a method to swap out chatrooms in this view
// called by parent when necessary
class ChatRoomWindow extends React.Component {

    // Mounts component
    constructor(props, ctx) {
        super(props, ctx);
        this.handleListenToMessages = this.handleListenToMessages.bind(this);
        this.remount();
    }
    
    // If component mounts, isMounted is set to true so that
    // We can initiate our listening functions
    // This is done because once component is unmounted,
    // the listen functions would run forever unless we have
    // A check for whether component is mounted 
    componentDidMount() {
        this.setState({
            isMounted: true
        });
        if(this.refs.messages) {
            this.refs.messages.scrollTop = this.refs.messages.scrollHeight;
        }
        this.server.listenToMessageUpdates((roomName, newMessageHistory) => {
            if (this.state.isMounted) {
                this.handleListenToMessages(roomName, newMessageHistory) 
            }
        });
        this.server.listenToChatroomUserUpdates((roomName, newUserSet, newOps) => {
            if (this.state.isMounted) {
                this.handleUserUpdates(roomName, newUserSet, newOps);
            }
        });
        
    }

    // Updates user in room, i.e. if user exits or quits room
    handleUserUpdates(roomName, newUserSet, newOps) {
        if(this.state.chatroom.name == roomName) {
            var newChatroom = this.state.chatroom;
            newChatroom.users = newUserSet;
            newChatroom.ops = newOps;
            this.setState({chatroom : newChatroom});
        }
    }

    // Listens to messages in chatroom
    // Updates chatroom and scrolls down if necessary
    handleListenToMessages(roomName, newMessageHistory) {
        if(this.state.chatroom.name == roomName) {
            var newChatroom = this.state.chatroom;
            newChatroom.messageHistory = newMessageHistory;
            this.setState({chatroom : newChatroom});
            this.refs.messages.scrollTop = this.refs.messages.scrollHeight;
        }
    }

    // On unmount, we want the listen functions to stop
    // So we set the isMounted state to false, hence
    // stopping all listening functions
    componentWillUnmount() {
        this.state.isMounted = false;
    }

    // Mounts the component
    remount() {
        this.server = this.context.serverAPI.server;
        this.state = {
            chatroom: this.props.chatroom,
            messageToSend: '',
            currentUser: this.props.currentUser,
            isMounted: false
        }
        
        this.sendPrivateMessage = this.props.sendPrivateMessage;
    }

    // Swaps chatroom the component renders
    swapChatrooms(chatroom) {
        this.setState({chatroom: chatroom});
    }

    // Updates message to be send on each input
    updateMessageInput(evt) {
        this.setState({
            messageToSend: evt.target.value
        });
    }

    // Sends message to chatroom
    sendMessage() {
        this.server.sendMessage(this.state.chatroom.name, this.state.messageToSend);
        this.refs.inputMsg.value = '';
        this.setState({
            messageToSend: ''
        });
    }

    // Renders chatroom messages
    renderRoomMessages(message) {
        if(this.state.currentUser != message.nick) {
            return (
                <div className='col-md-12'>
                    <span id='messageTimeStamp'>
                        {message.timestamp}
                    </span>
                    <span id='messageSender'>
                        {message.nick}
                    </span>
                    <div className='messageContent'>
                        <span id='messageContent'>
                            {message.message}
                        </span>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='col-md-offset-4 col-md-8 þmeMessages'>
                    <div className="messageMeWrap">
                        <span id='messageTimeStampMe'>
                            {message.timestamp}
                        </span>
                        <div className='messageContentMe col-md-10'>
                            <span id='messageContent'>
                                {message.message}
                            </span>
                        </div>
                        <span id='messageSenderMe col-md-2'>
                            {message.nick}
                        </span>
                    </div>
                </div>
            );
        }
    }

    // Renders chatroom as a whole
    render() {
        if(this.props.chatroom === null) {
            return <div id='chatroomWindow' />
        }
        return (
            <div id='chatroomWindow'>
                <div className='row infoAndUsers'>
                    <div className='col-md-9'>
                        <div className='infoAndChat'>
                            <p id='windowHeading'>{this.state.chatroom.name}</p>
                            <p id='windowTopic'>{this.state.chatroom.topic}</p>   
                            <div ref='messages' className='roomMessages'>
                                {this.state.chatroom.messageHistory.map((message) => (
                                    <p>{this.renderRoomMessages(message)}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 activeUsersInRoom'>
                        <ListViewUsers>
                            {this.state.chatroom.users.map((user) => (<ListItemUsers key={user} sendPrivateMessage={this.sendPrivateMessage} chatroom={this.state.chatroom} currentUser={this.props.currentUser} name={user}/>))}
                        </ListViewUsers>
                    </div>
                </div>
                <div className='row userChatInput'>
                    <div className='col-md-10'>
                        <textarea ref='inputMsg' className='form-control' id='messageInput' placeholder='I have the high ground, Anakin!' onChange={ evt => this.updateMessageInput(evt)}></textarea>
                    </div>
                    <div className='col-md-2'>
                        <button id='messageSendButton' onClick={() => this.sendMessage()}>Send</button>
                    </div>
                </div>
            </div>
        );
    }
};

// Variables lobby needs from parent context
// Get server object for service calls
ChatRoomWindow.contextTypes = {
    
    serverAPI: PropTypes.shape({
        server: PropTypes.component
    }),
};

export default ChatRoomWindow;