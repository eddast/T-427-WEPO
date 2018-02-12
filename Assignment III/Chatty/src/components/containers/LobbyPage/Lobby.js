import React from 'react';
import ListViewUsers from './ListViewUsers';

class Lobby extends React.Component {
    constructor(props, ctx) {
        super(props, ctx);
        this.server = this.props.server;
    }
    render() {
        return (
            <div className='LobbyBody'>
                <ListViewUsers server = {this.server}/>
            </div>
        );
    };
};

export default Lobby;