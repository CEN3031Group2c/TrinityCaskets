import React, {Component} from 'react';
import ReactTextCollapse from 'react-text-collapse';
import axios from 'axios'
import "./Listings.css"
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Cart from "../../views/Cart/Cart";


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

    static propTypes = {
        auth: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.addListingToCart = this.addListingToCart.bind(this);
        this.goToCart = this.goToCart.bind(this);

        console.log(this.props.auth);

        this.state = {
            data: [],
            snackbarOpen: false
        };
    }

    // Add the listing to the cart
    addListingToCart(e) {
        console.log(this.props.auth.user);
        const listingToAdd = {
            user: this.props.auth.user,
            product: e
        };
        console.log(listingToAdd);
        axios.post('/api/cart', listingToAdd)
            .then((res) => {
                console.log('Listing successfully added!')
            }).catch((error) => {
            console.log(error)
        });
        this.setState({ snackbarOpen: true });


    }
    
    componentDidMount() {
        axios.get('/api/listings/')
        .then(response => {
            this.setState({
                data: response.data
            })
        });
    }

    goToCart(){
        return(
            <a href="/Cart">
                <Button color="secondary" size="small">
                    Go to cart
                </Button>
            </a>
        )
    }

    render() {

        const backendData = this.state.data;
        const casketList = backendData
        .filter(listing => {
            return listing.type.toLowerCase() == this.props.type //???
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
                            <Button onClick={() => { this.addListingToCart(listing) }} size="sm" variant="primary">
                                Add to Cart

                            </Button>
                            <MuiThemeProvider>
                                <Snackbar
                                    open={this.state.snackbarOpen}
                                    message='Item added to your cart.'
                                    autoHideDuration={4000}
                                    bodyStyle={{ 'background': '#1B8B17'}}
                                    action={this.goToCart()}
                                />
                            </MuiThemeProvider>
                        </div>

                  </div>
            );
        });
        return <div className="all_listings"><div class = "row">{casketList}</div></div>
    }
}

// Stuff needed to get the authentication state interacting with the page's components
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    null
)(Listings);
