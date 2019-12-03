import React, {Component} from 'react';
import Listings from "../../components/Listings/Listings"
import './Catalog.css';

class Catalog extends React.Component {

    constructor(props)
  {
    super(props);

    this.state =
      { };

  }
    render()
    {
    return (
        <div className="App" class="centered">
            <Listings type="casket" input = {this.props.Input}/>
        </div>
    );
    }
}
export default Catalog;
