import React, {Component} from 'react';
import ReactTextCollapse from 'react-text-collapse';
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

/*function getListings() {
    var data = [];
    fetch('http://localhost:5000/api/listings', {mode: 'no-cors'})
    .then((response) => response.json())
    .then((json) => data = json);
    return data;
}*/

const data = [
    {
        modelNumber: '6429',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        price: 453,
        image: 'https://trinity-caskets-bucket.s3.amazonaws.com/casket.jpg',
        type: 'Casket',
    },
    {
        modelNumber: '6429',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        price: 453,
        image: 'https://trinity-caskets-bucket.s3.amazonaws.com/casket.jpg',
        type: 'Casket',
    },
    {
        modelNumber: '6429',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        price: 453,
        image: 'https://trinity-caskets-bucket.s3.amazonaws.com/casket.jpg',
        type: 'Casket',
    },
    {
        modelNumber: '6429',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        price: 453,
        image: 'https://trinity-caskets-bucket.s3.amazonaws.com/casket.jpg',
        type: 'Casket',
    },
    {
        modelNumber: '6429',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        price: 453,
        image: 'https://trinity-caskets-bucket.s3.amazonaws.com/casket.jpg',
        type: 'Casket',
    },
    {
        modelNumber: '6429',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        price: 453,
        image: 'https://trinity-caskets-bucket.s3.amazonaws.com/casket.jpg',
        type: 'Casket',
    },
    {
        modelNumber: '6429',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        price: 453,
        image: 'https://trinity-caskets-bucket.s3.amazonaws.com/casket.jpg',
        type: 'Casket',
    },
    {
        modelNumber: '6429',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        price: 453,
        image: 'https://trinity-caskets-bucket.s3.amazonaws.com/casket.jpg',
        type: 'Casket',
    },
    {
        modelNumber: '6429',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        price: 453,
        image: 'https://trinity-caskets-bucket.s3.amazonaws.com/casket.jpg',
        type: 'Casket',
    }
]

export class Listings extends Component {
    render() {
        const casketList = data
        .filter(listing => {
            return listing.type.toLowerCase() == "casket"
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
