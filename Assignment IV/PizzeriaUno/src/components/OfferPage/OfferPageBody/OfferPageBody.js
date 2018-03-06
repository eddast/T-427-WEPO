import React from 'react';
import { connect } from 'react-redux';
import { getAllOffers } from '../../../actions/offerAction';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import OfferListItem from '../OfferListItem/OfferListItem';
import { Redirect } from 'react-router-dom';

class OfferPageBody extends React.Component {

    constructor (props, ctx) {
        super(props, ctx);
        this.state = {
            isLoading: true,
            selectedPizza: null,
            redirectToOffer: false
        };
        this.redirectToOfferFunction = this.redirectToOfferFunction.bind(this)
    }

    componentDidMount() {
        const { getAllOffers } = this.props;
        getAllOffers();
        this.setState({ isLoading: false});
    }

    redirectToOfferFunction (offer) {
        this.setState({redirectToOffer: offer});
    }

    render() {
        if(this.state.redirectToOffer !== false) {
            return <Redirect to={{
                pathname: '/offers/selection',
                offerSelected: { referrer: this.state.redirectToOffer }
            }} />
        }
        const { offer } = this.props;
        if(this.state.isLoading || !Array.isArray(offer)) { return <LoadingScreen />; }
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

const mapStateToProps = ({ offer }) => {
    return { offer };
}

export default connect(mapStateToProps, { getAllOffers })(OfferPageBody);