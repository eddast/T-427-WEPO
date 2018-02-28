import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';
import InitialPage from './components/InitialPage/InitialPage';
// import LoadingScreen from './components/LoadingScreen/LoadingScreen';

class App extends React.Component {
    render() {
        return <InitialPage />;
        // return <LoadingScreen />
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
