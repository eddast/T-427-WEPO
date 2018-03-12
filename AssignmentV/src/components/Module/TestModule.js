import React from 'react';
import Module from './Module';

class TestModule extends React.Component {

    constructor(props, ctx) {
        super(props,ctx);
        this.state = {
            showModule: false
        };
    }

	render() {
		return (
            <div>
                <button onClick={() => this.setState({showModule: true})}>Show Module </button>
                <Module isOpen={this.state.showModule} onClose={() => this.setState({showModule: false})}/>
            </div>
        );
	}
}

export default TestModule;
