import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';
import InitialPage from './components/containers/InitialPageNickname/InitialPage';
import Banner from './components/Banner';
import Server from './services/API';
import { BrowserRouter, Route, Link } from 'react-router-dom'

class App extends React.Component {
    constructor(props) {
        super(props);
        Server.connectToSocket();
    }
    render() {
        return (
            <div>
                <Banner/>
                <InitialPage server={Server}/>
            </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
