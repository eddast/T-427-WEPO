import React from 'react';
import ListViewUsers from './ListViewUsers';
import ListItemUsers from './ListItemUsers';
import PropTypes from 'prop-types';

// Renders the view on a chatroom window
// Provides a method to swap out chatrooms in this view
// called by parent when necessary
class ChatRoomWindow extends React.Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.server = this.context.serverAPI.server;
        this.state = {
            chatroom: this.props.chatroom,
            messageToSend: ''
        }
        this.server.listenToChatroomUserUpdates((roomName, newUserSet, newOps) => {
            if(this.state.chatroom.name == roomName) {
                var newChatroom = this.state.chatroom;
                newChatroom.users = newUserSet;
                newChatroom.ops = newOps;
                this.setState({chatroom : newChatroom});
            }
        });
        this.server.listenToMessageUpdates((roomName, newMessageHistory) => {
            if(this.state.chatroom.name == roomName) {
                var newChatroom = this.state.chatroom;
                newChatroom.messageHistory = newMessageHistory;
                this.setState({chatroom : newChatroom});
            }
        });
    }

    // Swaps chatroom the component renders
    swapChatrooms(chatroom) {
        this.setState({chatroom: chatroom});
    }

    updateMessageInput(evt) {
        this.setState({
            messageToSend: evt.target.value
        });
    }

    sendMessage() {
        this.server.sendMessage(this.state.chatroom.name, this.state.messageToSend);
    }

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
                            <div className='roomMessages'>
                                {this.state.chatroom.messageHistory.map((message) => (
                                    <p>
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
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 activeUsersInRoom'>
                        <ListViewUsers>
                            {this.state.chatroom.users.map((user) => (<ListItemUsers name={user}/>))}
                        </ListViewUsers>
                    </div>
                </div>
                <div className='row userChatInput'>
                    <div className='col-md-10'>
                        <textarea className='form-control' id='messageInput' placeholder='I have the high ground, Anakin!' onChange={ evt => this.updateMessageInput(evt)}></textarea>
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
ChatRoomWindow.contextTypes = {
    
    serverAPI: PropTypes.shape({
        server: PropTypes.component
    }),
};

export default ChatRoomWindow;