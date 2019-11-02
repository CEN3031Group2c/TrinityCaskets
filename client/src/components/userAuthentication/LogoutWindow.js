import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import PropTypes from 'prop-types';

export class LogoutWindow extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    };

    // On click, logout
    render() {
        return (
            <Fragment>
                <NavLink onClick={this.props.logout} href='#'>
                    Logout
                </NavLink>
            </Fragment>
        );
    }
}

export default connect(
    null,
    { logout }
)(LogoutWindow);
