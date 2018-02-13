import React from 'react';
// import FontAwesome from 'react-fontawesome';

const ChatRoomWindow = ({ chatroom }) => {

    if(chatroom === null) {
        return <div id='chatroomWindow' />
    }
    const { name, topic } = chatroom;
    return (
        <div id='chatroomWindow'>
            <div className='row infoAndUsers'>
                <div className='col-md-10'>
                    <div className='infoAndChat'>
                        <p id='windowHeading'>{name}</p>
                        <p id='windowTopic'>{topic}</p>
                        <div className='roomMessages'>
                            <p>I am message</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-2 activeUsersInRoom'>
                    <p>I am user</p>
                </div>
            </div>
            <div className='row userChatInput'>
                <p>Here I am!</p>
            </div>
        </div>
    );
};

export default ChatRoomWindow;