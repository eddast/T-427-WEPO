import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';
import InitialPage from './components/InitialPage/InitialPage';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import AboutPage from './components/AboutPage/AboutPageView/AboutPageView';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import reducers from './reducers/reducers';

class App extends React.Component {
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

// ReactDOM.render(<Provider store={createStore()}><Router><App /></Router></Provider>, document.getElementById('app'));
ReactDOM.render(<Router><App /></Router>, document.getElementById('app'));
