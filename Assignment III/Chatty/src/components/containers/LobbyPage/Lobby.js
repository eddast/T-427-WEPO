import React from 'react';
import ListViewUsers from './ListViewUsers';
import ListItemUsers from './ListItemUsers';
//import ListViewChatRooms from './ListViewChatRooms';
import Banner from '../../Banner'
import PropTypes from 'prop-types'

class Lobby extends React.Component {
    
    constructor(props, ctx) {

        super(props, ctx);
        //Use the next two functions to store all info about each and every chatRoom
        this.allChatRooms = [];
        this.eachChatRoom = {
            name : 'dumdum',
            id : 1, 
            messageHistory : [],
            userslist : [],

        }
        this.state = {
            userList : [],
            chatRoomList : [],
            showChatRoomAvailable : true
        };
        this.server = this.context.serverAPI.server;
        this.server.getUsers();
        this.server.listenToUserUpdates((userlist)=> {
            console.log('userList is: ');
            console.log(userlist);
            this.setState({userList: userlist});
        });
        this.server.getChatrooms();
        this.server.listenToChatroomUpdates((chatRoomlist) => {
            console.log('chatRoomList is: ');
            console.log(chatRoomlist);
            //Like this how we can get all objects inside chatRoomlist 
            console.log(chatRoomlist.lobby.messageHistory); 
            this.setState({chatRoomList: chatRoomlist});
        });
    }

    switchViews(){
        console.log('Heello, switching stuff');
        if (this.state.showChatRoomAvailable == true){
            //this.state.showChatRoomAvailable = false;
            this.setState({showChatRoomAvailable: false});
        }
        else{
            // this.state.showChatRoomAvailable = true;
            this.setState({showChatRoomAvailable: true});
        }
        console.log('boolean value is: ' + this.state.showChatRoomAvailable);

    }

    render() {
        console.log('Hello, can you see me');
        console.log('Value of the boolean: ' + this.state.showChatRoomAvailable);
        if (this.state.showChatRoomAvailable){
            return <div>
                <Banner />
                <div class="lobbyPageIsHere">
                  <div class="showUsersDiv">
                    <div className="LobbyBody">
                      <ListViewUsers value={this.state.userList}>
                        {this.state.userList.map(user => (
                          <ListItemUsers name={user} />
                        ))}
                      </ListViewUsers>
                      {/* <ListViewChatRooms value={this.state.userList}>
                            {this.state.chatRoomList.map((chatroom) => (<ListItemChatRooms name={chatroom}/>))}
                        </ListViewChatRooms> */}
                    </div>
                  </div>
                  <div class="showAvailableChatRoomsDiv">
                    <div class="allChatRoomsDiv">
                      <div class="emptySpaceBetweenChatRooms" />
                        {/* This must be implemented */}
                        {/* <ListViewChatRooms value={this.state.userList}>
                            {this.state.chatRoomList.map((chatroom) => (<ListItemChatRooms name={chatroom}/>))}
                        </ListViewChatRooms> */}

                      <div class="eachAndEveryChatRoom" onClick={evt => this.switchViews(evt)}>
                        <p class="nameOfTheChatRoomBox">
                          My chatroom
                        </p>
                      </div>
                      <div class="emptySpaceBetweenChatRooms" />
                      <div class="eachAndEveryChatRoom">
                        <p class="nameOfTheChatRoomBox">
                          My chatroom
                        </p>
                      </div>
                      <div class="emptySpaceBetweenChatRooms" />
                      <div class="eachAndEveryChatRoom">
                        <p class="nameOfTheChatRoomBox">
                          My chatroom
                        </p>
                      </div>
                      <div class="emptySpaceBetweenChatRooms" />
                      <div class="eachAndEveryChatRoom">
                        <p class="nameOfTheChatRoomBox">
                          My chatroom
                        </p>
                      </div>
                      <div class="emptySpaceBetweenChatRooms" />
                      <div class="eachAndEveryChatRoom">
                        <p class="nameOfTheChatRoomBox">
                          My chatroom
                        </p>
                      </div>
                      <div class="emptySpaceBetweenChatRooms" />
                    </div>
                    <div />
                  </div>
                </div>
              </div>;
        }
        else{
            return <div>
                <Banner />
                <div class="lobbyPageIsHere">
                  <div class="showUsersDiv">
                    <div className="LobbyBody">
                      <ListViewUsers value={this.state.userList}>
                        {this.state.userList.map(user => (
                          <ListItemUsers name={user} />
                        ))}
                      </ListViewUsers>
                      {/* <ListViewChatRooms value={this.state.userList}>
                            {this.state.chatRoomList.map((chatroom) => (<ListItemChatRooms name={chatroom}/>))}
                        </ListViewChatRooms> */}
                    </div>
                  </div>
                  <div class="showAvailableChatRoomsDiv">
                    <p onClick={evt => this.switchViews(evt)}>
                      Hello to me
                    </p>
                  </div>
                </div>
              </div>;
        }
    };
};

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