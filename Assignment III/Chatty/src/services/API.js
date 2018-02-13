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
                if(nameOK) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    static getUsers() {
        this.socket.emit('users');
        return new Promise((resolve) => {
            this.socket.on('userlist', userlist => {
                resolve(userlist);
            });
        });
    }

    static listenToUserUpdates(resolve) {
        this.socket.on('userlist', userlist => {
            resolve(userlist);
        });
    }

    static getChatrooms() {
        this.socket.emit('users');
        return new Promise((resolve) => {
            this.socket.on('userlist', userlist => {
                resolve(userlist);
            });
        });
    }

    static listenToChatroomUpdates(resolve) {
        this.socket.on('userlist', userlist => {
            console.log(userlist);
            resolve(userlist);
        });
    }
}


