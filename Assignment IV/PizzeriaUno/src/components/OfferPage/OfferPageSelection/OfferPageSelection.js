import React from 'react';
import NavigationBar from '../../NavigationBar/NavigationBar';
import { connect } from 'react-redux';
import SelectionItem from '../OfferSelectionListItem/OfferSelectionListItem';
import { getAllPizzas } from '../../../actions/pizzaAction';

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
                return this.twoPizzasAndCoke(offerSelected);

            } else if (this.isOfferThree(offerSelected)) {
                return this.onePizzaAndACoke(offerSelected);
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
                    <h3>Make your selection (two pizzas):</h3>
                    <div>
                        {pizzas.map((pizza) => <SelectionItem onClick={this.checkSelection}key={pizza.id} pizza={pizza} isSelected={this.isSelected} max={max}/>)}
                    </div>
                </div>
            </div>
        );
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

    twoPizzasAndCoke(offer) {
        return (
            <div>
                <NavigationBar />
                <h1>You want two pizzas and a coke</h1>
                <h2>Select two pizzas from the menu and get a free coke for only {offer.price} kr</h2>
            </div>
        );
    }

    onePizzaAndACoke(offer) {
        return(
            <div>
                <NavigationBar />
                <h1>You want one pizza and a coke</h1>
                <h2>Select a pizzas from the menu and get a free coke for only {offer.price}:</h2>
            </div>
        );
    }
};

const mapStateToProps = ({ pizza }) => {
    return { pizza };
}

export default connect(mapStateToProps, { getAllPizzas })(OfferPageSelection);