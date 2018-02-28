import React from 'react';
import { connect } from 'react-redux';
import PizzaListItem from '../PizzaListItem/PizzaListItem';
import { getAllPizzas } from '../../../actions/pizzaAction';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';

class MenuPageBody extends React.Component {

    constructor (props, ctx) {
        super(props, ctx);
        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {
        const { getAllPizzas } = this.props;
        getAllPizzas();
        this.setState({ isLoading: false});
    }

    render() {
        const { pizza } = this.props;
        if(this.state.isLoading) { return <LoadingScreen />; }
        return (
            <div className='row menuBody'>
                <div className='pizzasInMenu'>
                    {pizza.map(p => <PizzaListItem key={p.id} pizza={p}/>)}
                </div>
            </div>
        );
    }
};

const mapStateToProps = ({ pizza }) => {
    return { pizza };
}

export default connect(mapStateToProps, { getAllPizzas })(MenuPageBody);