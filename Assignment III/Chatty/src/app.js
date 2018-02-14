import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Redirect } from 'react-router';
import InitialPage from './components/containers/InitialPageNickname/InitialPage';
import Lobby from './components/containers/LobbyPage/Lobby'
import Server from './services/API';

class App extends React.Component {

    constructor(props, ctx) {
        super(props, ctx);
        Server.connect();
    }

    // Values to pass to each child component
    getChildContext() {
        return {
            routeTools: {
                redirect: Redirect
            },
            serverAPI : {
                server: Server
            },
            currentUser : {
                userName: 'nobody'
            }
        }
    }

    // Renders route paths, i.e. InitialPage as '/'
    render() {
        return RouterPaths;
    }
}

// Available paths in app
var RouterPaths = (
    <Switch>
        <Route exact path='/' component={InitialPage} />
        <Route exact path='/lobby' component={Lobby} />
        <div> 404 not found </div>
    </Switch>
);

// Format of values to pass to child component
App.childContextTypes = {

    routeTools: PropTypes.shape({
        redirect: PropTypes.component,
    }),

    serverAPI: PropTypes.shape({
        server: PropTypes.component
    }),

    currentUser: PropTypes.shape({
        userName: PropTypes.string
    }),
};

ReactDOM.render(<Router><App /></Router>, document.getElementById('app'));
