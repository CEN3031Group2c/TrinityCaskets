import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import store from '../redux/store';



// Component that's passed in + auth state
class PrivateRoute extends Component{

    // this.props is reserved in class components
    render() {
        const { user, isLoading } = this.props.auth;

        if (isLoading) {
            return <h2>Loading...</h2>;
        }
        // If not logged in, or not an admin
        else if (!user || !user.admin) {
            return <h2>Access Denied</h2>
        }
        // If an admin, load up the specified component
        else {
            return <this.props.component />;
        }
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);