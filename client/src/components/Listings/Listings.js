import React, {Component} from 'react';
import ReactTextCollapse from 'react-text-collapse';
import axios from 'axios'
import "./Listings.css"
import BootstrapButton from "react-bootstrap/Button";
import {Modal, ModalBody, ModalHeader, Button} from "reactstrap";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


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
            snackbarOpen: false,
            loginModalOpen: false
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

    promptLogin() {
        this.setState({loginModalOpen: true});
    }

    closeLogin() {
        this.setState({loginModalOpen: false});
    }

    toggleLoginModal = () => {
        this.setState({
            loginModalOpen: !this.state.loginModalOpen
        });
    };
    
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
            <BootstrapButton href="/Cart" color="secondary" size="small">
                Go to cart
            </BootstrapButton>
        )
    }

    render() {
        const backendData = this.state.data;
        const casketList = backendData
        .filter(listing => {
            return (listing.type || '').toLowerCase().indexOf(this.props.type.toLowerCase())>=0
                    && ((listing.description || '').toLowerCase().indexOf(this.props.input.toLowerCase())>=0
                    || (listing.modelNumber || '').toLowerCase().indexOf(this.props.input.toLowerCase())>=0
                    || (listing.type || '').toLowerCase().indexOf(this.props.input.toLowerCase())>=0)
        })
        .map((listing, index) => {
            return (
                <div id="tile" key={index}>
                      <div id="img_holder">
                        {(listing.image != "") ?
                         <img src={listing.image} width='260' /> : 
                         <img src='https://trinity-caskets-bucket.s3.amazonaws.com/no-image-available.jpg' width='260' />}  
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
                            <BootstrapButton onClick={() => {
                                if(this.props.auth.isAuthenticated) {
                                    this.addListingToCart(listing) 
                                } else {
                                    this.toggleLoginModal()
                                }
                            }} size="sm" variant="primary">
                                Add to Cart

                            </BootstrapButton>
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
        return <div className="App" className="centered">
                    <div className="all_listings">
                        <div className = "row">{casketList}</div>
                    </div>
                    <Modal
                            isOpen={this.state.loginModalOpen}
                            toggle={this.toggleLoginModal}
                            className="modal_content"
                            overlayClassName="modal"
                        >
                        <ModalHeader toggle={this.toggleLoginModal} id="header">Log In</ModalHeader>
                        <ModalBody>
                            <h4>Please login or register to add items to your cart</h4>
                            <Button color='dark' id="cancel_button" onClick={this.toggleLoginModal}>
                                Close
                            </Button>
                        </ModalBody>
                    </Modal>
                </div>  
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
