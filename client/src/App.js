import React, { Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"

import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer/Footer"
import About from "./views/About/About"
import CT from "./views/Catalog/Catalog"
import Urn from "./views/Urn/Urn"
import Search from "./views/Search/search"
import FQ from "./views/FQ/FQ"
import Admin from "./views/Administrator/Administrator"
import PrivateRoute from "./components/PrivateRoute"
import ListingCreator from "./components/AdminPanel/ListingCreator"
import Cart from "./components/Cart/Cart";

// Getting redux to work
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/authActions';
import { Context } from 'mocha';


class App extends React.Component {
    constructor(props)
    {
        super(props);
        this.state=
        {
            searchIn: '',
            lookingfor: new URLSearchParams(window.location.search).toString().slice(0,-1).toLowerCase(),
        }
    }


    // Dispatch the 'check if user logged in'
    componentDidMount() {
        store.dispatch(loadUser());
    }

    SetValue(val)
    {
      this.setState({searchIn: val})
    }

    

    
    // Added the store for redux. The rest is the same as before
    render() {
        const routeS = 
        [
            {
                path: "/Search",
                component: Search,
                Input: this.state.searchIn
            }
        ]

        return (
            <Provider store={store}>
                <div id="all_content_holder">
                         <Header 
                         SetValue = {this.SetValue.bind(this)}/>
                    <div id = "page_content">
                      <Switch>
                        <Route exact path="/Home" component={Home}/>
                        <Route exact path="/About" component={About} />
                        <Route exact path="/FAQ" render={() => ( <FQ/>)} />
                        <Route exact path="/Catalog" component={CT} />
                        <Route exact path="/Urn" component={Urn} />
                        <Route path="/Search" render={ (props)=> ( <Search Input={this.state.searchIn}/>)} />
                        <Route exact path="/Cart" component={Cart} />
                        <PrivateRoute exact path="/Admin" component={Admin} />
                        <PrivateRoute exact path="/Admin/ListingCreator" component={ListingCreator} />
                        
                        <Route exact path="/">
                            <Redirect to="/Home"/>

                        </Route>
                        <Route component={NotFound}/>
                      </Switch>
                    </div>
                    <Footer />
                </div>
            </Provider>
        );
    }
}

export default App;
