/*
 * SERVER: Communicates with chatserver.js API
 */
import * as io from 'socket.io-client';

export default class Server {

    constructor () {
        this.socket = null;
    };

    // Connects to socket running on localhost:8080
    static connectToSocket () {
        this.socket = io.connect('http://localhost:8080');
    };

    // Sets user nickname
    static setNickname(nickname) {
        return new Promise((resolve) => {
            this.socket.emit('adduser', nickname, (nameOK) => {
                resolve(nameOK);
            });
        });
    }

    // Emits to chatserver.js for information on active users
    static getUsers() {
        this.socket.emit('users');
    }

    // Listens to chatserver.js socket for update on active users
    static listenToUserUpdates(resolve) {
        this.socket.on('userlist', userlist => {
            resolve(userlist);
        });
    }

    // Emits to chatserver.js for information on active chatrooms
    static getChatrooms() {
        this.socket.emit('rooms');
    }

    // Listens to chatserver.js socket for update on active chatrooms
    static listenToChatroomUpdates(resolve) {
        this.socket.on('roomlist', rooms => {
            var roomlist = this.dictToArray(rooms);
            for(var i in roomlist) {
                roomlist[i].users = this.convertDict(roomlist[i].users);
            }
            resolve(roomlist);
        });
    }

    // Adds chatroom by name and topic
    static addChatroom (name, topic, resolve) {
        var newRoom = {room: name};
        this.socket.emit('joinroom', newRoom, (creationOK) => {
            if(creationOK) {
                var newTopic = {topic: topic, room: name};
                this.socket.emit('settopic', newTopic, (topicOK) => {
                    resolve(topicOK)
                });
            }
            resolve(false);
        });
    }

    // Explicitly tell chatserver.js that user has parted a chatroom
    static partChatroom (name) {
        this.socket.emit('partroom', name);
    }

    // Explicitly tell chatserver.js that user has joined a chatroom
    static joinChatroom (name) {
        var toJoin = {room: name};
        this.socket.emit('joinroom', toJoin, (joinOK) => {
            return joinOK;
        });
    }

    // Convert dict to array with new attribute name
    static dictToArray (dict) {
        var newArray = [];
        for(var i in dict) {
            dict[i].name = i;
            newArray.push(dict[i]);
        }

        return newArray;
    }

    // Convert dict to array
    static convertDict (dict) {
        var newArray = [];
        for(var i in dict) {
            newArray.push(dict[i]);
        }

        return newArray;
    }
}


