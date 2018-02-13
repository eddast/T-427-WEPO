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
        Server.connectToSocket();
    }

    getChildContext() {
        return {
            routeTools: {
                router: Router,
                route: Route,
                redirect: Redirect
            },
            serverAPI : {
                server: Server
            }
        }
    }

    render() {
        return RouterPaths;
    }
}

var RouterPaths = (
    <Switch>
        <Route exact path="/" component={InitialPage} />
        <Route exact path="/lobby" component={Lobby} />
        <div> 404 not found </div>
    </Switch>
);

App.childContextTypes = {

    routeTools: PropTypes.shape({
        router: PropTypes.component,
        route: PropTypes.component,
        redirect: PropTypes.component,
    }),

    serverAPI: PropTypes.shape({
        server: PropTypes.component
    })
};

ReactDOM.render(<Router><App /></Router>, document.getElementById('app'));
