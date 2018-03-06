import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/reducers';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import About from './components/AboutPage/AboutPageView/AboutPageView';
import Menu from './components/MenuPage/MenuPageView/MenuPageView';
import Offers from './components/OfferPage/OfferPageView/OfferPageView';
import OfferPageSelection from './components/OfferPage/OfferPageSelection/OfferPageSelection';
import Pizza from './components/MenuPage/PizzaDetailView/PizzaDetailView';
import Home from './components/HomePage/HomePage';
import Cart from './components/CartPage/CartPageView/CartPageView';
import Checkout from './components/Checkout/CheckoutOpeningScreen/Checkout';
import Delivery from './components/Checkout/HaveItDelivered/HaveItDelivered';
import PickUp from './components/Checkout/PickUp/PickUp';
import OrderReview from './components/Checkout/OrderReview/OrderReview';
import ConfirmOrder from './components/Checkout/ConfirmOrder/ConfirmOrder';
import Order from './components/OrderPage/OrderPage';

import '../styles/site';

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
        <Route exact path='/pizzas/:pizzaid' component={Pizza} />
        <Route exact path='/offers' component={Offers} />
        <Route exact path='/offers/selection' component={OfferPageSelection} /> 
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/about' component={About} />
        <Route exact path='/order' component={Order} />
        <Route exact path='/checkout' component={Checkout} />
        <Route exact path='/checkout/delivery' component={Delivery} />
        <Route exact path='/checkout/pickup' component={PickUp} />
        <Route exact path='/checkout/delivery/confirmation' component={OrderReview} />
        <Route exact path='/checkout/pickup/confirmation' component={OrderReview} />
        <Route exact path='/checkout/delivery/confirmation/done' component={ConfirmOrder} />
        <Route exact path='/checkout/pickup/confirmation/done' component={ConfirmOrder} />
        <div> 404 not found </div>
    </Switch>
);

ReactDOM.render(<Provider store={createStore(reducers, applyMiddleware(thunk))}><Router><App /></Router></Provider>, document.getElementById('app'));