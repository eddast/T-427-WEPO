import React from 'react';
import { connect } from 'react-redux';
import PizzaListItem from '../PizzaListItem/PizzaListItem';
import { getAllPizzas } from '../../../actions/pizzaAction';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';

// Renders all pizzas in API in a list
class MenuPageBody extends React.Component {

    constructor (props, ctx) {
        super(props, ctx);
        this.state = { isLoading: true }; /* Determines whether view is loading i.e. wheter loading screen should be displayed */
    }

    // Gets all pizzas in API into component props via redux action
    // while all pizzas are being retrieved, a loading screen is displayed
    componentDidMount() {
        const { getAllPizzas } = this.props;
        getAllPizzas();
        this.setState({ isLoading: false});
    }

    render() {

        // retrieve pizza from redux store state props
        const { pizza } = this.props;

        // Carefully display loading screen if pizzas haven't been retrieved
        // (Might otherwise yield an error)
        if(this.state.isLoading || !Array.isArray(pizza)) {
            return <LoadingScreen />;
        }

        // If view has loaded, render all pizzas from API
        return (
            <div className='row menuBody'>
                <div className="pageViewHeadings">
                    <h1>The Menu</h1>
                    <h2>Mamma mia, che delizioso sembra!</h2>
                </div>
                <div className='pizzasInMenu'>
                    {pizza.map(p => <PizzaListItem key={p.id} pizza={p}/>)}
                </div>
            </div>
        );
    }
};

// Map redux store state to component props
const mapStateToProps = ({ pizza }) => {
    return { pizza };
}

export default connect(mapStateToProps, { getAllPizzas })(MenuPageBody);