import React from 'react';
import NicknameChoice from './NicknameChoice';
//import Lobby from '../LobbyPage/Lobby'

class InitialPage extends React.Component {
    constructor(props, ctx) {
        super(props, ctx);
        this.server = this.props.server;
    }
    render() {
        return (
            <div className='initialPageBody'>
                <NicknameChoice server = {this.server}/>
                {/* <Lobby server = {this.server}/> */}
            </div>
        );
    };
};

export default InitialPage;