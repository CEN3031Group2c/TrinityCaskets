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
    <div id="all_content_holder">
        {isAuthenticated ? userLinks : noUserLinks}
        <div id = "title_box">
            <div id = "title">
            Trinity Casket Store... And More
            </div>
            <div id = "top_buttons">
                <div id = "login_signup">
                    <div id = "login">
                        login
                    </div>
                    <div id = "signup">
                        sign up
                    </div>
                </div>
                <div id = "user_info">
                    INFO
                </div>
                <div id = "cart">
                    CART
                </div>
            </div>
        </div>

        <div id = "middle_box">
            <div id = "middle_box_info">
                Welcome to the website. This box is used to contain important header information. It should be about two lines long, although it could be extended if necessary.
            </div>
            <div id="search_bar_holder">
                SEARCH
                <input type="text" name="search" placeholder="to..." value={this.state}/>
                <button type = "submit" id="search_bar_button">
                    GO
                </button>
            </div>
        </div >

        <div id = "navbar">
            <div className = "nav_button">
                HOME
            </div>
            <div className = "nav_button">
              ABOUT
            </div>
            <div className = "nav_button">
                CASKETS
            </div>
            <div className = "nav_button">
                URNS
            </div>
            <div className = "nav_button">
                HEADSTONES
            </div>
            <div className = "nav_button">
                FAQ
            </div>
          </div>
      </div>
    );
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
