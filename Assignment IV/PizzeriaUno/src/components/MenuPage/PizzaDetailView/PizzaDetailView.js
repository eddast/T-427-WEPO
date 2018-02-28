import React from 'react';

class PizzaDetailView extends React.Component {
    constructor(props, ctx) {
        super(props, ctx);
    }

    render() {
        const {pizzaid} = this.props.params;
        return(
            <div className="pizzaBackground">
                <h1>{pizzaid}</h1>
            </div>
        );
    }
};

export default PizzaDetailView;