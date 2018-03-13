import React from 'react';
import styles from './basicstyle.css';
import Modal from'./components/Modal/Modal';
import ProgressBar from'./components/ProgressBar/ProgressBar';

class App extends React.Component {

	constructor(props, ctx) {
		super(props,ctx);
		this.state = {
			showModule: false
		};
	}

	render() {
		return (
			<div className={`${styles.container}`}>

				<div className={`${styles['container-headings']}`}>
					<h1>Welcome To the InfinityModules DEMO site</h1>
					<p>InfinityModules is a library of React components from the studio of USA (Universal Style Association). Our goal is to please your sight. This page demonstrates the power of our delightfulness. Try our fancy library out, go nuts!</p>
				</div>
				<div className={`${styles['container-item']}`}>
					<h2>1. Modal Component Demo</h2>
					{this.testModal()}
				</div>
				<div className={`${styles['container-item']}`}>
					<h2>2. ProgressBar Component Demo</h2>
					<h3>2.1. Striped ProgressBar</h3>
					{this.testProgressBar(50, "success", false, true)}
					<h3>2.2. Animated ProgressBar</h3>
					{this.testProgressBar(50, "success", true, false)}
					<h3>2.3. Different Progresses ProgressBar</h3>
					{this.testProgressBar(10, "success", false, false)}
					{this.testProgressBar(30, "success", false, false)}
					{this.testProgressBar(50, "success", false, false)}
					<h3>2.4. Different States ProgressBar</h3>
					{this.testProgressBar(50, "info", false, false)}
					{this.testProgressBar(50, "success", false, false)}
					{this.testProgressBar(50, "warning", false, false)}
					{this.testProgressBar(50, "danger", false, false)}
				</div>


			</div>
        );
	}

	// TESTS MODAL COMPONENT
	testModal() {
		return (
            <div>
                <button onClick={() => this.setState({showModule: true})}>Show Modal</button>
				<Modal.Modal
					isOpen={this.state.showModule}
					onClose={() => this.setState({showModule: false})}>
					<Modal.Title>I am the title</Modal.Title>
					<Modal.Body>
						<p>Well hello, I am the modal body</p>
						<p>I don't need to be text, can also be html elements, look:</p>
						<input type="text" placeholder="pretty cool, huh!"/>
					</Modal.Body>
					<Modal.Footer>This is the footer of the Modal</Modal.Footer>
				</Modal.Modal>
            </div>
        );
	}

	// TESTS PROGRESS BAR COMPONENT
	testProgressBar(progress, state, animated, striped) {
		return (
			<div>
				<div>
					The following demonstrates a {state} progressBar with {progress}% progress (animated: {String(animated)}, striped: {String(striped)}):
				</div>
				<div>
					<ProgressBar 
						progress={progress}
						animated={animated}
						striped={striped}
						state={state}
					/>
				</div>
			</div>
        );
	}
}

export default App;
