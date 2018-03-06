import React from 'react';
import NavigationBar from '../../NavigationBar/NavigationBar';
import { connect } from 'react-redux';
import SelectionItem from '../OfferSelectionListItem/OfferSelectionListItem';
import { getAllPizzas } from '../../../actions/pizzaAction';
import FontAwesome from 'react-fontawesome';

class OfferPageSelection extends React.Component {

    constructor(props, ctx) {
        super(props, ctx)
        this.state = {
            pizzaSelection : []
        }

        this.checkSelection = this.checkSelection.bind(this);
        this.isSelected = this.isSelected.bind(this);
    }

    componentDidMount() {
        const { getAllPizzas } = this.props;
        getAllPizzas();
    }

    isOfferOne(offer) {
        return offer.offer === 'Two for the prize of one (pay for more expensive pizza)';
    }

    isOfferTwo(offer) {
        return offer.offer === 'Two pizzas and a coke';
    }

    isOfferThree(offer) {
        return offer.offer === 'One pizza and a coke';
    }

    render() {
        var offerSelected = this.props.location.offerSelected && this.props.location.offerSelected.referrer;
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
        console.log(offer);
        alert('Should redirect to user info on ' + offer.validFor);
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

export default connect(mapStateToProps, { getAllPizzas })(OfferPageSelection);