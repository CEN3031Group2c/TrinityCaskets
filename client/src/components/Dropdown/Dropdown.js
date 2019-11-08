import React, {Component} from 'react';
import "./dropdown.css"

class Dropdown extends Component
{
  constructor()
  {
    super();

    this.state =
      { showMenu: false,};

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
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
              <div className="list_item">
                All
              </div>
            <div className="list_item">
                Wood
              </div>
            <div className="list_item">
                Copper
              </div>
            <div className="list_item">
                Stainless Steel
              </div>
            <div className="list_item">
                18 Gauge Steel
              </div>
            <div className="list_item">
                20 Gauge Steel
              </div>
            <div className="list_item">
                Oversize
              </div>
            <div className="list_item">
                Full Couch
              </div>
            <div className="list_item">
                Children
              </div>
            <div className="list_item">
                Other
              </div>
            </div>
          )
        : ( null )
      }
      </div>
      );
  }
}

export default Dropdown;