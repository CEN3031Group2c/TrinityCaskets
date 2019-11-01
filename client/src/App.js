import React, { Component } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"

// Redux stuff for updating application state
import { Provider } from 'react-redux';
import { loadUser } from './redux/actions/authActions';
import store from './redux/store';



class App extends Component{
    // Need to call our store when the app mounts (start up the cycle of checking for user authentication)
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <Header/>
                    <Switch>
                        <Route exact path="/Home" component={Home}/>
                        <Route exact path="/">
                            <Redirect to="/Home"/>
                        </Route>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Provider>
        );
    }
}

export default App;
