import React, {Component} from 'react';
import ReactTextCollapse from 'react-text-collapse';
import axios from 'axios'
import "./Listings.css"

const TEXT_COLLAPSE_OPTIONS = {
    collapse: false, // default state when component rendered
    collapseText: 'More Info', // text to show when collapsed
    expandText: 'Less Info', // text to show when expanded
    minHeight: 50, // component height when closed
    maxHeight: 250, // expanded to
    textStyle: { // pass the css for the collapseText and expandText here
      color: "blue",
      fontSize: "12px"
    }
}

export class Listings extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    
    componentDidMount() {
        axios.get('/api/listings/')
        .then(response => {
            this.setState({
                data: response.data
            })
        });
      
    render() {
        const backendData = this.state.data;
        const casketList = backendData
        .filter(listing => {
            return listing.type.toLowerCase() == this.props.type
        })
        .map(listing => {
            return (
                <div id="tile">
                      <div id="img_holder">
                        <img src={listing.image} width='260'></img>
                      </div>
                        <div id="tile_body">
                            <div id="model_name">Model Number:
                                #{listing.modelNumber}
                            </div>
                            <div id="description">
                                <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
                                    {listing.description}
                                </ReactTextCollapse>
                            </div>
                            <div id="price">
                                ${listing.price}
                            </div>
                            <div id="add_cart">
                                Add To Cart
                            </div>
                        </div>
                  </div>
            );
        });
        return <div className="all_listings"><div class = "row">{casketList}</div></div>
    }
}

export default Listings;
