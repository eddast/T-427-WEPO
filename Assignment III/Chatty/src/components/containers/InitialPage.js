import React from 'react';
import NicknameChoice from '../containers/NicknameChoice';

class InitialPage extends React.Component {
    constructor(props, ctx) {
        super(props, ctx);
        this.server = this.props.server;
        this.server.connectToSocket();
    }
    render() {
        return (
            <div className='initialPageBody'>
                <NicknameChoice server = {this.server}/>
            </div>
        );
    };
};

export default InitialPage;