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
import Search from "./views/Search/Search"
import Headstones from "./views/Headstones/Headstones"
import FQ from "./views/FQ/FQ"
import Admin from "./views/Administrator/Administrator"
import PrivateRoute from "./components/PrivateRoute"
import ListingCreator from "./components/AdminPanel/ListingCreator"
import NewAdmin from "./components/AdminPanel/NewAdmin"
import Cart from "./views/Cart/Cart";

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
            search: '',
            type: '',
            cartItems: []
        }
    }


    // Dispatch the 'check if user logged in'
    componentDidMount() {
        store.dispatch(loadUser());
    }

    setSearch(val)
    {
      this.setState({search: val})
    }

    setType(val)
    {
       // console.log("Happen 9 " +val);
      this.setState({type: val})
    }




    // Added the store for redux. The rest is the same as before
    render() {

        return (
            <Provider store={store}>
                <div id="all_content_holder">
                         <Header
                         setSearch = {this.setSearch.bind(this)}
                         setType = {this.setType.bind(this)}/>
                    <div id = "page_content">
                      <Switch>
                        <Route exact path="/Home" component={Home}/>
                        <Route exact path="/About" component={About} />
                        <Route exact path="/FAQ" render={() => ( <FQ/>)} />
                        <Route exact path="/Catalog" render={() => (<CT input = {this.state.search}/>)} />
                        <Route exact path="/Urn" component={Urn} />
                        <Route path="/Search" render={()=> ( <Search input={this.state.search}/>)} />
                        <Route path="/Cart" render={() => (<Cart Items={this.state.cartItems} />)} />
                        <Route path="/Headstones" component = {Headstones}/>
                        <PrivateRoute exact path="/Admin" component={Admin} />
                        <PrivateRoute exact path="/Admin/ListingCreator" component={ListingCreator} />
                        <PrivateRoute exact path="/Admin/NewAdmin" component={NewAdmin} />

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
