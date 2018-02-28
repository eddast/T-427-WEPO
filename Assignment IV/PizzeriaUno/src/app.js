import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';
import InitialPage from './components/InitialPage/InitialPage';
// import LoadingScreen from './components/LoadingScreen/LoadingScreen';
// import NavigationBar from './components/NavigationBar/NavigationBar';

class App extends React.Component {
    render() {
        return (
            <div>
                {/* <NavigationBar /> */}
                <InitialPage />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
