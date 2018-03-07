import React from 'react';
import { connect } from 'react-redux';
import { getAllOffers } from '../../../actions/offerAction';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import OfferListItem from '../OfferListItem/OfferListItem';
import { Redirect } from 'react-router-dom';

// Renders all offers from API
class OfferPageBody extends React.Component {

    constructor (props, ctx) {
        super(props, ctx);
        this.state = {
            isLoading: true,
            redirectToOffer: false
        };

        // Bind component functions to this context (called from subcomponents)
        this.redirectToOfferFunction = this.redirectToOfferFunction.bind(this)
    }

    // Immediately use redux action to retrieve all offers API
    // Once retrieved, view exits 'loading mode' i.e. stops displaying loading screen
    componentDidMount() {
        const { getAllOffers } = this.props;
        getAllOffers();
        this.setState({ isLoading: false});
    }

    // Notify view it should redirect user to offer he/she clicked on
    // (Function passed on to subcomponents as an onclick func)
    redirectToOfferFunction (offer) {
        this.setState({redirectToOffer: offer});
    }

    render() {

        // Redirect user to selection for offer if he or she has chosen one
        if(this.state.redirectToOffer !== false) {
            return <Redirect to={{
                pathname: '/offers/selection',
                offerSelected: { referrer: this.state.redirectToOffer }
            }} />
        }

        // Extract offers from component props
        const { offer } = this.props;

        // Display loading screen while retrevieving all offers
        // (Watching out for undefined errors)
        if(this.state.isLoading || !Array.isArray(offer)) { return <LoadingScreen />; }
    
        // If redirect is not relevant and view has loaded,
        // Displays all offer information in a listview
        return (
            <div className="offerBody">
                <div className="pageViewHeadings">
                    <h1>Our Offers</h1>
                    <h2>Che meraviglia! Offers last a limited time only - don't miss out!</h2>
                </div>
                <div className='row'>
                    <div className='offersActive'>
                        {offer.map(o => <OfferListItem key={o.id} onClick={() => this.redirectToOfferFunction(o)} itemoffer={o}/>)}
                    </div>
                </div>
            </div>
        );
    }
};

// Map store state attributes to component props
const mapStateToProps = ({ offer }) => {
    return { offer };
}

export default connect(mapStateToProps, { getAllOffers })(OfferPageBody);