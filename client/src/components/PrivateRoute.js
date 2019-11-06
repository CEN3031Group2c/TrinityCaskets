import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// Component that's passed in + auth state
const PrivateRoute = ({ component: Component, auth }) => (

    <Route
        render={props => {
            if (auth.isLoading ) {
                return <h2>Loading...</h2>;
            }
            else if(!auth.user){
                return <h2>Access Denied</h2>
            }
            // If not an admin
            else if (!auth.user.admin) {
                return <Redirect to="/" />;
            }
            // If an admin, load up the specified component
            else {
                return <Component {...props} />;
            }
        }}
    />
);

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);