import React from 'react';
import Server from '../../services/API';
import NicknameChoice from '../containers/NicknameChoice';

class InitialPage extends React.Component {
    constructor(props, ctx) {
        super(props, ctx);
        Server.connectToSocket();
        this.state = {
            server: Server.server,
        }
    }
    render() {
        return (
            <div className='initialPageBody'>
                <NicknameChoice server = {Server}/>
            </div>
        );
    };
};

export default InitialPage;