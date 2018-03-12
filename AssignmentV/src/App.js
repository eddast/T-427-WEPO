import React from 'react';
import TestModule from './components/Testers/TestModule';

class App extends React.Component {
	render() {
		return (
			<div>

			<h1>Welcome To the InfinityModules DEMO site</h1>
			<p>InfinityModules is a library of React components from the studio of USA (Universal Style Association). Our goal is to please your sight. This page demonstrates the power of our delightfulness. Try our fancy library out, go nuts!</p>

			<h3>1. Module Component Demo</h3>
			<TestModule />


			</div>
        );
	}
}

export default App;
