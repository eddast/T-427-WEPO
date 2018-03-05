import React from 'react';
import { connect } from 'react-redux';
import PizzaListItem from '../PizzaListItem/PizzaListItem';
import { getAllPizzas } from '../../../actions/pizzaAction';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';

class MenuPageBody extends React.Component {

    constructor (props, ctx) {
        super(props, ctx);
        this.state = {
            isLoading: true,
            selectedPizza: null
        };
    }

    componentDidMount() {
        const { getAllPizzas } = this.props;
        getAllPizzas();
        this.setState({ isLoading: false});
    }

    // Adds pizza to 'cart' in local storage
    addToLocalStorage(pizza) {
        var pizzasInCart = JSON.parse(localStorage.getItem('cartPizzasInventory'));
        if(pizzasInCart == null) { pizzasInCart = []; }
        pizzasInCart.push(pizza);
        localStorage.setItem('cartPizzasInventory', JSON.stringify(pizzasInCart));
        alert(pizza.name + ' added to your cart!');
    }   

    render() {
        const { pizza } = this.props;
        if(this.state.isLoading || !Array.isArray(pizza)) { return <LoadingScreen />; }
        if(this.state.selectedPizza === null) {
            return (
                <div className='row menuBody'>
                    <div className="pageViewHeadings">
                        <h1>The Menu</h1>
                        <h2>Mamma mia, che delizioso sembra!</h2>
                    </div>
                    <div className='pizzasInMenu'>
                        {pizza.map(p => <PizzaListItem key={p.id} pizza={p} addToLocalStorage={this.addToLocalStorage}/>)}
                    </div>
                </div>
            );
        }

        return <div />;
    }
};

const mapStateToProps = ({ pizza }) => {
    return { pizza };
}

export default connect(mapStateToProps, { getAllPizzas })(MenuPageBody);