import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';
import InitialPage from './components/containers/InitialPage';
import Banner from './components/Banner';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Banner/>
                <InitialPage/>
            </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
