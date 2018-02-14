import React from 'react';
// import FontAwesome from 'react-fontawesome';
import ListViewUsers from './ListViewUsers';
import ListItemUsers from './ListItemUsers';

class ChatRoomWindow extends React.Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            chatroom: this.props.chatroom,
        }
    }

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

export default ChatRoomWindow;