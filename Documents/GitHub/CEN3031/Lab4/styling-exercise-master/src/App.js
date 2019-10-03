import React, { Component } from 'react';
import './App.css';
import Customers from './Customers'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';


class App extends Component {
  render() {
    console.log("Host URL"+process.env.PUBLIC_URL);
    return (

      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
        <header className="App-header">
          <h1 className="App-title" style={{color:'#b19cd9'}}>Simple React People</h1>
          <img src="https://i.ibb.co/MMy82LW/clipart2555256.png" alt="logo" style={{height:'90px'}} />
        </header>
        <br/>
        <br/>
        <br/>
          <Switch>
                <Route exact path= "/" render={() => (
                  <Redirect to="/customerlist"/>
                )}/>
                 <Route exact path='/customerlist' component={Customers} />
          </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
