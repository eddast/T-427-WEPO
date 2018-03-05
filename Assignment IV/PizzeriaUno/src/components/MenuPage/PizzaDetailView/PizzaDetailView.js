import React from 'react';
import { connect } from 'react-redux';
import { getPizzaByID } from '../../../actions/pizzaAction';
import NavigationBar from '../../NavigationBar/NavigationBar'
import FontAwesome from 'react-fontawesome';
import { Redirect, Link } from 'react-router-dom';
import { addToCart } from '../../../actions/cartAction';

class PizzaDetailView extends React.Component {

    constructor (props, ctx) {
        super(props, ctx);
        this.state = {
            toCheckout : false
        }
    }

    componentDidMount() {
        const {pizzaid} = this.props.match.params;
        const { getPizzaByID } = this.props;
        getPizzaByID(pizzaid);
    }

    // Adds pizza to local storage cart via react redux function
    addToLocalStorage(pizza) {
        var addToLocalStorageCart = this.props.addToCart;
        addToLocalStorageCart(pizza);
        var toCheckout = confirm(pizza.name + ' added to your cart!\nDo you wish to checkout your cart?\n(Press OK to checkout, cancel to keep browsing)');
        this.setState({toCheckout: toCheckout});
    } 

    render() {
        const { pizza } = this.props;
        if(this.state.toCheckout === true) {
            return <Redirect to={{pathname: '/checkout'}} />;
        }
        return(
            <div className="whiteBackground">
                <NavigationBar />
                <Link to={'/pizzas'} >
                    <div id="back">
                        <FontAwesome id="back" name='arrow-circle-left'/>
                        <p id="backToMenu">Menu</p>
                    </div>
                </Link>
                <div className="pizzaDetail" style={{backgroundImage: 'url(' + pizza.image + ')'}}>
                    <div className="pizzaInfo">
                        <p className="pizzaName">{pizza.name}</p>
                        <p className="pizzaDescription">{pizza.description}</p>
                        <p className="pizzaPrice">{pizza.price} kr</p>
                        <p className="pizzaDontMissOut">Don't miss out!</p>
                        <span onClick={() => this.addToLocalStorage(pizza)}className="pizzaAddToCart">Add to cart</span>
                    </div>
                </div>
            </div>
        );
    }
};
const mapStateToProps = ({ pizza }) => {
    return { pizza };
}

export default connect(mapStateToProps, { getPizzaByID, addToCart })(PizzaDetailView);