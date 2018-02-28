import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';
import InitialPage from './components/InitialPage/InitialPage';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
// import NavBar from './components/NavigationBar/NavigationBar';
import AboutPage from './components/AboutPage/AboutPage';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';


class App extends React.Component {

    // Renders route paths, i.e. InitialPage as '/'
    render() {
        return RouterPaths;
    }
}

// Available paths in app
var RouterPaths = (
    <Switch>
        <Route exact path='/' component={InitialPage} />
        <Route exact path='/pizzas' component={LoadingScreen} />
        <Route exact path='/offers' component={LoadingScreen} />
        <Route exact path='/cart' component={LoadingScreen} />
        <Route exact path='/about' component={AboutPage} />
        <div> 404 not found </div>
    </Switch>
);

ReactDOM.render(<Router><App /></Router>, document.getElementById('app'));
