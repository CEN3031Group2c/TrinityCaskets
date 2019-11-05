import React, { Component} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import About from "./views/About/About"
import CT from "./views/Catalog/Catalog"
import FQ from "./views/FQ/FQ"

// Getting redux to work
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/authActions';

class App extends Component {
    // Dispatch the 'check if user logged in'
    componentDidMount() {
        store.dispatch(loadUser());
    }

    // Added the store for redux. The rest is the same as before
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Header/>
                    <Switch>
                        <Route exact path="/Home" component={Home}/>
                        <Route exact path="/About" component={About} />
                        <Route exact path="/Frequent_question" component={FQ} />
                        <Route exact path="/Catalog" component={CT} />
                        <Route exact path="/">
                            <Redirect to="/Home"/>
                        </Route>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Provider>
        );
    };
}

export default App;
