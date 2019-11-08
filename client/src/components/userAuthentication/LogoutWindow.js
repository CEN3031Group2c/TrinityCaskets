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
                <div onClick={this.props.logout} href='#'>
                    <div id="signup">log out</div>
                </div>
            </Fragment>
        );
    }
}

export default connect(
    null,
    { logout }
)(LogoutWindow);
