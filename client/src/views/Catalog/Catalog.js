import React from 'react';
import Listings from "../../components/Listings/Listings"
import './Catalog.css';

class Catalog extends React.Component {

    constructor(props)
  {
    super(props);
  }
    render()
    {
    return (
            <Listings type="casket" input = {this.props.input}/>
    );
    }
}
export default Catalog;
