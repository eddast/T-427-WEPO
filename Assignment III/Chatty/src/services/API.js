/*
 * SERVER: Communicates with chatserver.js API
 */
import * as io from 'socket.io-client';

export default class Server {

    constructor () {
        this.socket = null;
    };

    static connectToSocket () {
        this.socket = io.connect('http://localhost:8080');
    };

    static setNickname(nickname) {
        return new Promise((resolve) => {
            this.socket.emit('adduser', nickname, (nameOK) => {
                resolve(nameOK);
            });
        });
    }

    static getUsers() {
        this.socket.emit('users');
    }

    static listenToUserUpdates(resolve) {
        this.socket.on('userlist', userlist => {
            resolve(userlist);
        });
    }

    static getChatrooms() {
        this.socket.emit('rooms');
    }

    static listenToChatroomUpdates(resolve) {
        this.socket.on('roomlist', rooms => {
            var roomlist = this.dictToArray(rooms);
            resolve(roomlist);
        });
    }

    static addChatroom (name, topic) {
        var newRoom = {room: name};
        this.socket.emit('joinroom', newRoom, (creationOK) => {
            if(creationOK) {
                var newTopic = {topic: topic, room: name};
                this.socket.emit('settopic', newTopic, (topicOK) => {
                    console.log(topicOK);
                    return topicOK;
                });
            }
            return false;
        });
    }

    static dictToArray (dict) {
        var newArray = [];
        for(var i in dict) {
            dict[i].name = i;
            newArray.push(dict[i]);
        }

        return newArray;
    }
}


