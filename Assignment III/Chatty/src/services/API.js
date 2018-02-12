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
        this.socket.emit('adduser', nickname, (nameOK) => {
            if(nameOK) {
                console.log('nickname set');
            } else {
                console.log('nickname unavailable');
            }
        });
    }
}


