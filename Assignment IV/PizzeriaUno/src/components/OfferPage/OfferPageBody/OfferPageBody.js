import React from 'react';
import { connect } from 'react-redux';
import { getAllOffers } from '../../../actions/offerAction';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import OfferListItem from '../OfferListItem/OfferListItem';

class OfferPageBody extends React.Component {

    constructor (props, ctx) {
        super(props, ctx);
        this.state = {
            isLoading: true,
            selectedPizza: null
        };
    }

    componentDidMount() {
        const { getAllOffers } = this.props;
        getAllOffers();
        this.setState({ isLoading: false});
    }

    render() {
        const { offer } = this.props;
        if(this.state.isLoading || !Array.isArray(offer)) { return <LoadingScreen />; }
        return (
            <div className='row offerBody'>
                <div className='offersActive'>
                    {offer.map(o => <OfferListItem key={o.id} itemoffer={o}/>)}
                </div>
            </div>
        );
    }
};

const mapStateToProps = ({ offer }) => {
    return { offer };
}

export default connect(mapStateToProps, { getAllOffers })(OfferPageBody);