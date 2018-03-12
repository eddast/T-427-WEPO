import React from 'react';
import { connect } from 'react-redux';
import { getPizzaByID } from '../../../actions/pizzaAction';
import NavigationBar from '../../NavigationBar/NavigationBar'
import FontAwesome from 'react-fontawesome';
import { Redirect, Link } from 'react-router-dom';
import { addToCart } from '../../../actions/cartAction';

// Pizza list item detail view
// Gets pizza by id and retrieves it
// Redirects user to checkout if he or she wishes
class PizzaDetailView extends React.Component {

    constructor (props, ctx) {
        super(props, ctx);
        this.state = { toCheckout : false } // Determines whether user should be redirected to checkout
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    // Immediately retrieve pizza by id via redux action
    // Uses the dynamic part of url to retrieve pizza
    componentDidMount() {
        const {pizzaid} = this.props.match.params;
        const { getPizzaByID } = this.props;
        getPizzaByID(pizzaid);
    }

    // Adds pizza to local storage cart via react redux function
    // Explicitly notifies user once added to cart
    // Offer user to immediately checkout cart
    // If so, sets redirect to true and redirects user to checkout
    addToLocalStorage(pizza) {
        var addToLocalStorageCart = this.props.addToCart;
        addToLocalStorageCart(pizza);
        var toCheckout = confirm(pizza.name + ' added to your cart!\nDo you wish to checkout your cart?\n(Press OK to checkout, cancel to keep browsing)');
        this.setState({toCheckout: toCheckout});
    } 

    render() {

        // Retrieve pizza from props
        const { pizza } = this.props;

        // Redirect user to checkout if he or she wishes
        if(this.state.toCheckout === true) {
            return <Redirect to={{pathname: '/checkout'}} />;
        }

        // Otherwise display detail view with relevant information on pizza
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

// Map store state attribute to component props
const mapStateToProps = ({ pizza }) => {
    return { pizza };
}

export default connect(mapStateToProps, { getPizzaByID, addToCart })(PizzaDetailView);