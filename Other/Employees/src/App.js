import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Employee from './Employee';
import Employees from './Employees';
import Contact from './Contact';
import Home from './Home';
import NavigationBar from './NavBar';

class App extends React.Component {
  render() {
    const paths = (
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/employees' component={Employees} />
          <Route exact path='/employees/:employeename' component={Employee} />
          <Route path="*" component={() => <div>404: Síðan finnst ekki</div>} />
        </Switch>
    );
    return (
      <div>
        <NavigationBar />
        {paths}
        <div>This is footer visible at all times</div>
      </div>
    );
  }
}

export default App;
