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
        }
        this.server.listenToChatroomUserUpdates((roomName, newUserSet, newOps) => {
            if(this.state.chatroom.name == roomName) {
                var newChatroom = this.state.chatroom;
                newChatroom.users = newUserSet;
                newChatroom.ops = newOps;
                this.setState({chatroom : newChatroom});
            }
        });
    }

    // Swaps chatroom the component renders
    swapChatrooms(chatroom) {
        this.setState({chatroom: chatroom});
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
                                <p>I am message</p>
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
                    <p>Here I am!</p>
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