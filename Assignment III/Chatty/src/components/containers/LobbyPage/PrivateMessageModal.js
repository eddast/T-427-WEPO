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
            chatHistory: []
        }
        this.server = this.context.serverAPI.server;
        this.closePrivateChatroom = this.props.closePrivateChatroom;
    }

    sendMessage() {
        this.server.sendPrivateMessage(this.state.toUser, this.refs.messageBox.value, (sendOK) => {
            if(sendOK) {
                this.setState({chatHistory: this.state.chatHistory.push(this.refs.messageBox.value)});
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
                            {this.state.chatHistory.map((previousMessage) => (<li> {previousMessage} </li>))}
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
    })
};

export default PrivateMessageModal;