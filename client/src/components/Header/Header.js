import React from 'react';
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
class Header extends React.Component {
  constructor(props)
  {
    super(props);
  }

    // 'logged in' prop we'll modify
    static propTypes = {
        auth: PropTypes.object.isRequired,
    };

    setSearchWithInput()
    {
      const searchValue = this.searchValue.value
      this.props.setSearch(searchValue)
    }

    setSearchWithDropdown(val)
    {
      this.props.setSearch(val)
    }

    setType(val)
    {
      this.props.setType(val)
    }

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
              <img className="topnav-logo" src={ "/usericon.png" } alt="React logo" />
            </div>
        );

        return (
          <div id="h">
            <div id = "title_box">
              <div id = "title">
                Trinity Casket Store.... And More
              </div>
              <div id = "top_buttons">
                <div id = "login_signup">
                  {isAuthenticated ? userLinks : noUserLinks}
                </div>
                    {user ? (user.admin ? adminBox : noAdminBox) : noAdminBox}

                  <a href="/Cart">
                    <div id = "cart">
                        <img className="topnav-logo" src={ "/carticon.png" } alt="React logo" />
                    </div>
                  </a>
              </div>
            </div>

          <div id = "middle_box">
            <div id = "middle_box_info">
              Trinity Casket Store.... And More is a veteran owned and operated retailer. Funeral homes <b>must</b> accept our merchandise. See our Frequently Asked Questions for more information.
            </div>
            <div id="search_bar_holder">
              <form>
              <input type="text" name="search" id = "search_bar" placeholder="Search..." ref={(value) => {this.searchValue = value} }/>
              <Link to={"/Search"}>
                <button type = "submit" id="search_bar_button" onClick={this.setSearchWithInput.bind(this)}>
                  GO
                </button>
              </Link>
              </form>
            </div>
          </div>


        <div id = "navbar">
          <Link to= "/Home">
            <div className = "nav_button">
              HOME
            </div></Link>
          <Link to="/About">
            <div className = "nav_button">
              ABOUT US
            </div></Link>
          <Dropdown setSearch = {this.setSearchWithDropdown.bind(this)}/>
          <Link to="/Urn">
            <div className = "nav_button nav_button_fix">
              URNS
            </div> </Link>
          <Link to="/Headstones">
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
