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
        return this.checkUserlistUpdates();
    }

    static checkUserlistUpdates() {
        return new Promise((resolve) => {
            this.socket.on('userlist', userlist => {
                resolve(userlist);
            });
        });
    }
}


