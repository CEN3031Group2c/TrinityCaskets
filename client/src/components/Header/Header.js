import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

// Login/logout stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterWindow from "../userAuthentication/RegisterWindow";
import LogoutWindow from "../userAuthentication/LogoutWindow";
import LoginWindow from "../userAuthentication/LoginWindow";
import Dropdown from "../Dropdown/Dropdown";

// Needed to make it a component to add extended functionality
class Header extends Component {

    // 'logged in' prop we'll modify
    static propTypes = {
        auth: PropTypes.object.isRequired,
    };


    render() {
        // Get whether we're logged in + the user's name from our 'logged in' prop
        const { isAuthenticated, user } = this.props.auth;

        // Change what is viewed based on if we're logged in or not
        // If we're logged in:
        const userLinks = (
            <div>
                <div id="welcome"> Welcome, user!</div>
                <LogoutWindow />
            </div>
        );

        // If we're not logged in:
        const noUserLinks = (
            <div>
                <LoginWindow />
                <RegisterWindow />
            </div>
        );

        const adminBox = (
            <a href="/Admin">
            <div id = "user_info">
                ADMIN
            </div>
            </a>
        );

        // If not admin, see user info
        const noAdminBox = (
            <div id = "user_info">
            INFO
            </div>
        );

        return (
          <div id="h">
            <div id = "title_box">
              <div id = "title">
                Trinity Casket Store... And More
              </div>
              <div id = "top_buttons">
                <div id = "login_signup">
                  {isAuthenticated ? userLinks : noUserLinks}
                </div>
                <div id = "user_info">
                   USER INFO
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
              <input type="text" name="search" id = "search_bar" placeholder="Search..." value={this.state}/>
              <button type = "submit" id="search_bar_button">
                GO
              </button>
            </div>
          </div>


        <div id = "navbar">
          <Link to= "/Home">
            <div className = "nav_button">
              HOME
            </div></Link>
          <Link to="/About">
            <div className = "nav_button">
              ABOUT
            </div></Link>
          <Dropdown />
          <Link to="/Urn">
            <div className = "nav_button nav_button_fix">
              URNS
            </div> </Link>
          <Link to="/Catalog">
            <div className = "nav_button">
              HEADSTONES
            </div></Link>
          <a href="/FAQ">
            <div className = "nav_button">
              FAQ
            </div></a>
        </div>
      </div>
        );
    }
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
