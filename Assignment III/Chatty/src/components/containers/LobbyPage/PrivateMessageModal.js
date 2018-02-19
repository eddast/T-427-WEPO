import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

// Renders the list of chatrooms along with heading
// and an "add chatroom" button to add a new chatroom to list
class PrivateMessageModal extends React.Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            toUser : this.props.toUser,
            chatHistory: [],
            isMounted: false
        }
        this.server = this.context.serverAPI.server;
        this.closePrivateChatroom = this.props.closePrivateChatroom;
        if(this.props.firstMessage !== '') {
            var firstEntry = this.state.toUser + ' initiated a private conversation with you';
            var historyEntry = this.state.toUser + ': ' + this.props.firstMessage;
            var newChatHistory = this.state.chatHistory;
            newChatHistory.push(firstEntry);
            newChatHistory.push(historyEntry);
            this.setState({chatHistory: newChatHistory});
        } else {
            var firstEntry = 'You initiated a private conversation with ' + this.state.toUser;
            var newChatHistory = this.state.chatHistory;
            newChatHistory.push(firstEntry);
            this.setState({chatHistory: newChatHistory});
        }
    }

    componentDidMount() {
        this.state.isMounted = true;
        this.server.listenToPrivateMessage((username, message) => {
            this.handlePrivateMessageListen(username, message);
        });
    }
    
    handlePrivateMessageListen(username, message) {
        if(this.state.isMounted) {
            if(username == this.state.toUser) {
                var historyEntry = username + ': ' + message;
                var newChatHistory = this.state.chatHistory;
                newChatHistory.push(historyEntry);
                this.setState({chatHistory: newChatHistory});
            }
        }
    }
    
    componentWillUnmount() {
        this.server.sendPrivateMessage(this.state.toUser, 'left the conversation', (sendOK) => {
            if(sendOK) {
                this.state.isMounted = false;
            }
        });
        this.state.isMounted = false;
    }

    sendMessage() {
        this.server.sendPrivateMessage(this.state.toUser, this.refs.messageBox.value, (sendOK) => {
            if(sendOK) {
                var historyEntry = 'You: ' + this.refs.messageBox.value;
                var newChatHistory = this.state.chatHistory;
                newChatHistory.push(historyEntry);
                this.setState({chatHistory: newChatHistory});
                this.refs.messageBox.value = '';
            }
        })
    }

    render() {
        if(!this.state.toUser) {
            return <div/>
        }

        return (
            <Modal className='privateMessageChat' isOpen={true} ariaHideApp={false} >
                <div className='row'>
                    <h1>Private Conversation with {this.state.toUser}</h1>
                    <div className='row'>
                        <ul>
                            {this.state.chatHistory.map((previousMessage) => (<li key={previousMessage}> {previousMessage} </li>))}
                        </ul>
                    </div>
                </div>
                <div className='row'>
                    <input className='form-control' type='text' ref='messageBox' placeholder='send your secret message...'/>
                    <button onClick={() => this.sendMessage()}>Send</button>
                </div>
                <div className='row'>
                    <button onClick={() => this.closePrivateChatroom()}>Exit Private Conversation</button>
                </div>
            </Modal>
        );
    }
};

PrivateMessageModal.contextTypes = {
    
    serverAPI: PropTypes.shape({
        server: PropTypes.component
    }),

    currentUser: PropTypes.shape({
        userName: PropTypes.string
    }),
};

export default PrivateMessageModal;