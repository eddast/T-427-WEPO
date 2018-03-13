import React from 'react';
import Module from'./components/Module/Module';

class App extends React.Component {

	constructor(props, ctx) {
		super(props,ctx);
		this.state = {
			showModule: false
		};
	}

	render() {
		return (
			<div>

			<h1>Welcome To the InfinityModules DEMO site</h1>
			<p>InfinityModules is a library of React components from the studio of USA (Universal Style Association). Our goal is to please your sight. This page demonstrates the power of our delightfulness. Try our fancy library out, go nuts!</p>

			<h3>1. Module Component Demo</h3>
			{this.testModule()}


			</div>
        );
	}

	// TESTS MODULE COMPONENT
	testModule() {
		return (
            <div>
                <button onClick={() => this.setState({showModule: true})}>Show Module </button>
                <Module
					isOpen={this.state.showModule}
					onClose={() => this.setState({showModule: false})}
				/>
            </div>
        );
	}
}

export default App;
