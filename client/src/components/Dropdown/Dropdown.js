import React, {Component} from 'react';
import "./dropdown.css"
import { Link } from 'react-router-dom';

class Dropdown extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state =
      { showMenu: false,};

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.onClickLink = this.onClickLink.bind(this);
  }

  showMenu(event)
  {
    event.preventDefault();
    this.setState({showMenu: true}, () =>
                  {
                    document.addEventListener('click', this.closeMenu);
                  });
  }

  closeMenu(event)
  {
    this.setState({showMenu: false}, () =>
                  {
                    document.removeEventListener('click', this.closeMenu);
                  });
  }

  onClickLink(val)
  {
      //console.log("Happen 6 " + val);
      this.props.setValue3(val);
  }

  render()
  {
    return(
      <div id="all" >
        <div className="nav_button" onClick={this.showMenu}>
          CASKETS
        </div>
      {
        this.state.showMenu
        ? (
            <div className = "menu">
              <Link to="/Catalog" >
              <div className="list_item" onClick = {() => this.onClickLink("")} >
                All
              </div>
              </Link>
              <Link to="/Catalog" onClick = {() => this.onClickLink("wood")} >
            <div className="list_item">
                Wood
              </div>
              </Link>
              <Link to="/Catalog"  onClick = {() => this.onClickLink("Copper")}>
            <div className="list_item">
                Copper
              </div>
              </Link>
              <Link to="/Catalog"  onClick = {() => this.onClickLink("Stainless Steel")}>
            <div className="list_item">
                Stainless Steel
              </div>
              </Link>
              <Link to="/Catalog"  onClick = {() => this.onClickLink("18 Gauge Steel")}>
            <div className="list_item">
                18 Gauge Steel
              </div>
              </Link>
              <Link to="/Catalog"    onClick = {() => this.onClickLink("20 Gauge Steel")}>
            <div className="list_item">
                20 Gauge Steel
              </div>
              </Link>
              <Link to="/Catalog"  onClick = {() => this.onClickLink("Oversize")}>
            <div className="list_item">
                Oversize
              </div>
              </Link>
              <Link to="/Catalog"    onClick = {() => this.onClickLink("Full Couch")}>
            <div className="list_item">
                Full Couch
              </div>
              </Link>
              <Link to="/Catalog"   onClick = {() => this.onClickLink("Children")}>
            <div className="list_item">
                Children
              </div>
              </Link>
              <Link to="/Catalog"   onClick = {() => this.onClickLink("Other")}>
            <div className="list_item">
                Other
              </div>
              </Link>
            </div>
          )
        : ( null )
      }
      </div>
      );
  }
}

export default Dropdown;