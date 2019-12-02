import React, { Component, isValidElement } from 'react';
import { Link, Route } from 'react-router-dom';
import './Header.css';

// Login/logout stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterWindow from "../userAuthentication/RegisterWindow";
import LogoutWindow from "../userAuthentication/LogoutWindow";
import LoginWindow from "../userAuthentication/LoginWindow";
import Dropdown from "../Dropdown/Dropdown";
import Search2 from "../../views/Search/search"


// Needed to make it a component to add extended functionality
class Header extends React.Component {
  constructor(props)
  {
    super(props);
    this.state=
    {
      searchV:'',
      lookingfor: '',
    }
  }

  

    // 'logged in' prop we'll modify
    static propTypes = {
        auth: PropTypes.object.isRequired,
    };

    setValue2(val)
    {
      this.setState({searchV: val.target.value});
      // this.props.SetValue(this.state.searchV)
    }
    setValue25(val)
    {
      this.props.SetValue(this.state.searchV)
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
              Trinity Casket Store.... And More is a veteran owned and operated retailer. Funeral homes <b>must</b> accept our merchandise. See our FAQ for more information.
            </div>
            <div id="search_bar_holder">
              <form>
              <input type="text" name="search" id = "search_bar" placeholder="Search..." value={this.state.searchV}  onChange = {this.setValue2.bind(this)} />
              {/* <input type="text" name="search" id = "search_bar" placeholder="Search..." value={this.state.search} ref={ (value) => {this.myValue = value} } onChange = {setValue.bind(this)} /> */}
              <Link to={"/Search?" + this.state.searchV }>
                {/*letid= this.state */}
                <button type = "submit" id="search_bar_button" onClick={this.setValue25.bind(this)}>
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
