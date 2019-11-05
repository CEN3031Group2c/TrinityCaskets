import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// Bring in the component, auth, ...rest for anything else
const PrivateRoute = ({ component: Component, auth, ...rest }) => (

    <Route
        {...rest}
        render={props => {
            console.log(auth);
            if (auth.isLoading) {
                return <h2>Loading...</h2>;
            }
            // If not an admin
            else if (!auth.user) {
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