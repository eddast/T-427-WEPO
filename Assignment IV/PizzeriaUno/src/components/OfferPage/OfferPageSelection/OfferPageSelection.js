import React from 'react';
import NavigationBar from '../../NavigationBar/NavigationBar';
import { connect } from 'react-redux';
import SelectionItem from '../OfferSelectionListItem/OfferSelectionListItem';
import { getAllPizzas } from '../../../actions/pizzaAction';
import FontAwesome from 'react-fontawesome';
import { Redirect } from 'react-router-dom';
import { replaceCart } from '../../../actions/cartAction';

class OfferPageSelection extends React.Component {

    constructor(props, ctx) {
        super(props, ctx)
        this.state = {
            offer: null,
            pizzaSelection : [],
            redirectTo: false
        }

        this.checkSelection = this.checkSelection.bind(this);
        this.isSelected = this.isSelected.bind(this);
    }

    componentDidMount() {
        const { getAllPizzas } = this.props;
        getAllPizzas();
    }

    // Identify offer
    isOfferOne(offer)   { return offer.id === 1; }
    isOfferTwo(offer)   { return offer.id === 2; }
    isOfferThree(offer) { return offer.id === 3; }

    render() {

        var offerSelected = this.props.location.offerSelected && this.props.location.offerSelected.referrer;
        this.state.offer = offerSelected;

        // User has selected
        if(this.state.redirectTo !== false) {
            var replaceCart = this.props.replaceCart;
            var newCart = this.state.pizzaSelection;
            replaceCart(newCart);
            if(this.state.redirectTo === 'delivery') {
                return <Redirect to={{
                    pathname: '/checkout/delivery',
                    offerSelected: { referrer: this.state.offer }
                }} />
            } else {
                return <Redirect to={{
                    pathname: '/checkout/pickup',
                    offerSelected: { referrer: this.state.offer }
                }} />
            }
        }
        const {pizza} = this.props;
        if(pizza !== undefined) { 
            if(this.isOfferOne(offerSelected)) {
                return this.twoForOneOffer(offerSelected, pizza);

            } else if (this.isOfferTwo(offerSelected)) {
                return this.twoPizzasAndCoke(offerSelected, pizza);

            } else if (this.isOfferThree(offerSelected)) {
                return this.onePizzaAndACoke(offerSelected, pizza);
            }
        }

        return <div>Something went wrong!</div>;
    }

    twoForOneOffer(offer, pizzas) {
        const max = 2;
        return (
            <div className="pizzaBackground">
                <NavigationBar />
                <div className="offerSelectionBody">
                    <h1>Get two pizzas for one</h1>
                    <h2>Select two pizzas from the menu for the price of one!</h2>
                    <h3>Make your selection:</h3>
                    <div>
                        {pizzas.map((pizza) => <SelectionItem onClick={this.checkSelection}key={pizza.id} pizza={pizza} isSelected={this.isSelected} max={max}/>)}
                    </div>
                    {this.getProceed(max, offer)}
                </div>
            </div>
        );
    }

    twoPizzasAndCoke(offer, pizzas) {
        const max = 2;
        return (
            <div className="pizzaBackground">
                <NavigationBar />
                <div className="offerSelectionBody">
                    <h1>Get a free coke with Joey's special!</h1>
                    <h2>Select two pizzas from the menu and get a free coke to go with it for only {offer.price} kr</h2>
                    <h3>Make your selection:</h3>
                    <div>
                        {pizzas.map((pizza) => <SelectionItem onClick={this.checkSelection}key={pizza.id} pizza={pizza} isSelected={this.isSelected} max={max}/>)}
                    </div>
                    {this.getProceed(max, offer)}
                </div>
            </div>
        );
    }

    onePizzaAndACoke(offer, pizzas) {
        const max = 1;
        return (
            <div className="pizzaBackground">
                <NavigationBar />
                <div className="offerSelectionBody">
                    <h1>Get a free coke with your pizza!</h1>
                    <h2>Select a pizza from the menu and get a free coke to go with it for only {offer.price}:</h2>
                    <h3>Make your selection:</h3>
                    <div>
                        {pizzas.map((pizza) => <SelectionItem onClick={this.checkSelection}key={pizza.id} pizza={pizza} isSelected={this.isSelected} max={max}/>)}
                    </div>
                    {this.getProceed(max, offer)}
                </div>
            </div>
        );
    }

    getProceed(max, offer) {
        if(this.canProceed(max)) {
            return(
                <div className="proceedToCheckoutOffer row" onClick={() => this.proceedToCheckout(offer)}>
                    Proceed &nbsp; &nbsp;
                    <FontAwesome name='arrow-circle-right'/>
                </div>
            );
        } else {
            return(
                <div className="proceedToCheckoutOffer proceedToCheckoutOfferDisabled row" onClick={() => this.displayNotAllowedToProceed(max)}>
                    Proceed &nbsp; &nbsp;
                    <FontAwesome name='arrow-circle-right'/>
                </div>
            );
        }
    }

    displayNotAllowedToProceed(max) {
        alert('Please select at least ' + max + ' pizzas for offer')
    }

    proceedToCheckout(offer) {
        this.setState({redirectTo: offer.validFor});
    }

    canProceed(max) {
        return this.state.pizzaSelection.length === max;
    }

    isSelected (pizza) {
        return this.state.pizzaSelection.includes(pizza);
    }

    checkSelection(pizza, max) {
        for (let i = 0; i < this.state.pizzaSelection.length; i++) {
            if(this.state.pizzaSelection[i] === pizza) {
                if(this.state.pizzaSelection.length === 1) {
                    this.setState({pizzaSelection: []});
                    return;
                }
                var newPizzaSelection = this.state.pizzaSelection.splice(i-1, 1);
                this.setState({pizzaSelection: newPizzaSelection});
                return;
            }
        }
        if(this.state.pizzaSelection.length === max) {
            alert('Only ' + max + ' pizzas can be selected with offer');
        } else {
            this.state.pizzaSelection.push(pizza);
            var newPizzasSelected = this.state.pizzaSelection;
            this.setState({pizzaSelection: newPizzasSelected});
        }
    }
};

const mapStateToProps = ({ pizza }) => {
    return { pizza };
}

export default connect(mapStateToProps, { getAllPizzas, replaceCart })(OfferPageSelection);