import React from 'react';
import { connect } from 'react-redux';
import { getPizzaByID } from '../../../actions/pizzaAction';
import NavigationBar from '../../NavigationBar/NavigationBar'

class PizzaDetailView extends React.Component {

    componentDidMount() {
        const {pizzaid} = this.props.match.params;
        const { getPizzaByID } = this.props;
        getPizzaByID(pizzaid);
    }

    render() {
        const { pizza } = this.props;
        // const backgroundImage =  "url(" + { pizza.image } + ")"
        return(
            <div className="whiteBackground">
                <NavigationBar />
                <div className="pizzaDetail" style={{backgroundImage: 'url(' + pizza.image + ')'}}>
                    <div className="pizzaInfo">
                        <p className="pizzaName">{pizza.name}</p>
                        <p className="pizzaDescription">{pizza.description}</p>
                        <p className="pizzaPrice">{pizza.price} kr</p>
                        <p className="pizzaDontMissOut">Don't miss out!</p>
                        <span className="pizzaAddToCart">Add to cart</span>
                    </div>
                </div>
            </div>
        );
    }
};
const mapStateToProps = ({ pizza }) => {
    return { pizza };
}

export default connect(mapStateToProps, { getPizzaByID })(PizzaDetailView);