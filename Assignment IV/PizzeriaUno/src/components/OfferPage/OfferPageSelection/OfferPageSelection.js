import React from 'react';
import NavigationBar from '../../NavigationBar/NavigationBar';
import { connect } from 'react-redux';
import SelectionItem from '../OfferSelectionListItem/OfferSelectionListItem';
import { getAllPizzas } from '../../../actions/pizzaAction';
import FontAwesome from 'react-fontawesome';
import { Redirect } from 'react-router-dom';
import { replaceCart } from '../../../actions/cartAction';

// Renders order page selection, i.e. prompts user to select order-specific number of pizzas
// To go with his or her selected offer
class OfferPageSelection extends React.Component {

    constructor(props, ctx) {
        super(props, ctx)
        this.state = {
            offer: null,
            pizzaSelection : [],
            redirectTo: false
        }

        // Bind component functions to this context (called from subcomponents)
        this.checkSelection = this.checkSelection.bind(this);
        this.isSelected = this.isSelected.bind(this);
    }

    // Immediately load all pizzas into view
    // Needed to prompt user for selecting pizzas
    componentDidMount() {
        const { getAllPizzas } = this.props;
        getAllPizzas();
    }

    // Triggered for user to be redirected to checkout
    proceedToCheckout(offer) { this.setState({redirectTo: offer.validFor}); }

    render() {

        // Extract offer from redirect location variable to use for rendering
        var offerSelected = this.props.location.offerSelected && this.props.location.offerSelected.referrer;
        this.state.offer = offerSelected;

        // If user has selected he is redirected to checkout for offer
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
        // Extract pizzas from API, should be retrieved in componentDidMount
        const {pizza} = this.props;

        // Get view and logic appropriate for particular offers
        if(pizza !== undefined && Array.isArray(pizza)) { 
            const max = this.getMaxForOffer(offerSelected.id);
            console.log(pizza);
            return (
                <div className="pizzaBackground">
                    <NavigationBar />
                    <div className="offerSelectionBody">
                        {this.getOfferHeadings(offerSelected)}
                        <div>
                            {pizza.map((pizza) => <SelectionItem onClick={this.checkSelection}key={pizza.id} pizza={pizza} isSelected={this.isSelected} max={max}/>)}
                        </div>
                        {this.getProceed(max, offerSelected)}
                    </div>
                </div>
            );
        }

        // This view should never appear, but just in case
        return <div>Something went wrong!</div>;
    }



    /***************************
     *  RENDER HELPER FUNCTIONS
     ***************************/

    // Contains logic for proceed button;
    // is disabled when user hasn't selected enough pizzas for offer
    getProceed(max, offer) {
        if(this.canProceed(max)) {
            return(
                <div>
                    <div className="proceedToCheckoutOffer row" onClick={() => this.proceedToCheckout(offer)}>
                        Proceed &nbsp; &nbsp;
                        <FontAwesome name='arrow-circle-right'/>
                    </div>
                    <div className="row">
                        <div>&nbsp;</div>
                    </div>
                </div>
            );
        } else {
            return(
                <div>
                    <div className="proceedToCheckoutOffer proceedToCheckoutOfferDisabled row" onClick={() => this.displayNotAllowedToProceed(max)}>
                        Proceed &nbsp; &nbsp;
                        <FontAwesome name='arrow-circle-right'/>
                    </div>
                    <div className="row">
                        <div>&nbsp;</div>
                    </div>
                </div>
            );
        }
    }



    /**********************************
     *  RENDER LOGIC HELPER FUNCTIONS
     **********************************/

    getOfferHeadings(offer) {
        if(offer.id === 1) {
            return (
                <div>
                    <h1>Get two pizzas for one</h1>
                    <h2>Select two pizzas from the menu for the price of one!</h2>
                    <h3>Make your selection:</h3>
                </div>
            );
        } else if (offer.id === 2) {
            return (
                <div>
                    <h1>Get a free coke with Joey's special!</h1>
                    <h2>Select two pizzas from the menu and get a free coke to go with it for only {offer.price} kr</h2>
                    <h3>Make your selection:</h3>
                </div>
            );
        } else if (offer.id === 3) {
            return(
                <div>
                    <h1>Get a free coke with your pizza!</h1>
                    <h2>Select a pizza from the menu and get a free coke to go with it for only {offer.price}:</h2>
                    <h3>Make your selection:</h3>
                </div>
            );
        }
    }

    // Get how many pizzas one can select given offer
    getMaxForOffer(offerID) {
        if(offerID===3) {
            return 1;
        } else {
            return 2;
        }
    }

    // Explict feedback that user can't proceed if he tries
    displayNotAllowedToProceed(max) { alert('Please select at least ' + max + ' pizzas for offer'); }

    // Returns true if user has seleced all pizzas for offer
    canProceed(max) { return this.state.pizzaSelection.length === max; }

    // returns true if pizza has been selected
    isSelected (pizza) { return this.state.pizzaSelection.includes(pizza); }

    // Checks and unchecks pizzas, i.e. adds and removes from user selection array
    checkSelection(pizza, max) {
        for (let i = 0; i < this.state.pizzaSelection.length; i++) {

            // Delete the only pizza in view; return empty array
            if(this.state.pizzaSelection[i] === pizza) {
                if(this.state.pizzaSelection.length === 1) {
                    this.setState({pizzaSelection: []});
                    return;
                }

                // Otherwise splice out pizza from selection array
                var newPizzaSelection = this.state.pizzaSelection.splice(i-1, 1);
                this.setState({pizzaSelection: newPizzaSelection});
                return;
            }
        }
        // Too many pizzas selected means no action is taken
        // But user get explicit feedback
        if(this.state.pizzaSelection.length === max) {
            alert('Only ' + max + ' pizzas can be selected with offer');
            return;
        }

        // Pizza is not selected; add pizza to user cart
        this.state.pizzaSelection.push(pizza);
        var newPizzasSelected = this.state.pizzaSelection;
        this.setState({pizzaSelection: newPizzasSelected});
    }
};

// Maps redux store state to component props
const mapStateToProps = ({ pizza }) => {
    return { pizza };
}

export default connect(mapStateToProps, { getAllPizzas, replaceCart })(OfferPageSelection);