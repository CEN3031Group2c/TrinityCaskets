import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

// Login/logout stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterWindow from "../userAuthentication/RegisterWindow";
import LogoutWindow from "../userAuthentication/LogoutWindow";
import LoginWindow from "../userAuthentication/LoginWindow";

// Needed to make it a component to add extended functionality
class Header extends Component {

    // 'logged in' prop we'll modify
    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    render() {

        // Get whether we're logged in + the user's name from our 'logged in' prop
        const { isAuthenticated, user } = this.props.auth;

        // Change what is viewed based on if we're logged in or not
        // If we're logged in:
        const userLinks = (
            <div>
                {user ? `Welcome ${user.name}` : ''}
                <LogoutWindow />
            </div>
        );

        // If we're not logged in:
        const noUserLinks = (
            <div>
                <RegisterWindow />
                <LoginWindow />
            </div>
        );

        return (
            <div className='topnav'>
                {/* Logo */}
                <Link id="logo-link" to="/">
                    <img className="topnav-logo" src={"/logo192.png"} alt="React logo"/>
                </Link>

                {/* Page Links */}
                <div className="topnav-right">
                    {isAuthenticated ? userLinks : noUserLinks}
                    <Link className="topnav-link" to='/projects'>Projects</Link>
                    <a className="topnav-link" target='_blank' rel="noopener noreferrer"
                       href="https://www.facebook.com/groups/ufosc/events/?source=4&action_history=null&filter=calendar">
                        Events
                        <i className="fas fa-external-link-alt external-link" data-fa-transform="up-6"></i>
                    </a>
                    <a className="topnav-link" target='_blank' rel="noopener noreferrer"
                       href="https://github.com/ufosc/club-resources">
                        Resources
                        <i className="fas fa-external-link-alt external-link" data-fa-transform="up-6 right-4"></i>
                    </a>
                    <Link className="topnav-link" to="/about">About</Link>
                </div>
            </div>
        )
    };
}

// Map our header's 'logged in' state to the overall 'logged in' prop
const mapStateToProps = state => ({
    auth: state.auth
});

// Export the mapped prop
export default connect(
    mapStateToProps,
    null
)(Header);
