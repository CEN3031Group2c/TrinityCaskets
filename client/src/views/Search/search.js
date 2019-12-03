import React from 'react';
//import Listings from "../../components/Listings/Listings"
import ReactTextCollapse from 'react-text-collapse';
import axios from 'axios'


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

class Search extends React.Component{
    constructor(props)
    {
        super(props);
        this.state=
        {
            data: []
        }
    }
    componentDidMount() {
        axios.get('/api/listings/')
        .then(response => {
            this.setState({
                data: response.data
            })
        });
    }    


    render() {

        const backendData = this.state.data
        .filter(listing => {
            console.log(listing)
            return ((listing.description || '').toLowerCase().indexOf(this.props.Input)>=0)
                    || (listing.modelNumber.toLowerCase().indexOf(this.props.Input)>=0)
                    || (listing.type.toLowerCase().indexOf(this.props.Input)>=0)

        })
        .map(listing => {
            return (
                <div>
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
                  </div>
            );
        });
        return <div className="all_listings"><div className = "row">{backendData}</div></div>
    }
    
}
export default Search;




