import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import About from './components/AboutPage/AboutPageView/AboutPageView';
import Menu from './components/MenuPage/MenuPageView/MenuPageView';
import Offers from './components/OfferPage/OfferPageView/OfferPageView';
import Home from './components/HomePage/HomePage';
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
        <Route exact path='/' component={Home} />
        <Route exact path='/pizzas' component={Menu} />
        <Route exact path='/offers' component={Offers} />
        <Route exact path='/cart' component={LoadingScreen} />
        <Route exact path='/about' component={About} />
        <div> 404 not found </div>
    </Switch>
);

// ReactDOM.render(<Provider store={createStore()}><Router><App /></Router></Provider>, document.getElementById('app'));
ReactDOM.render(<Router><App /></Router>, document.getElementById('app'));
