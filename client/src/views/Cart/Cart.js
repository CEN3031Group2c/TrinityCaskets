import React, {Component} from 'react';
import axios from 'axios'
import {connect} from "react-redux";
import CartTable from '../../components/Cart/CartTable'
import Table from "react-bootstrap/Table";


class Cart extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            shouldLogin: false
        };
    }

    // Because user authentication doesn't load immediately, need to define it once it's ready
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.auth.isAuthenticated !== this.props.auth.isAuthenticated) {
            console.log('Here: '+ this.props.auth.isAuthenticated)
            if (this.props.auth.isAuthenticated) {
                const user = {
                    id: this.props.auth.user._id
                };
                console.log(user);
                axios.get('/api/cart/' + this.props.auth.user._id).then(res => {
                    this.setState({
                        cartItems: res.data.items
                    })
                }).catch((error) => {
                    console.log(error);
                })
            }
            else{
                this.setState({
                    shouldLogin: true
                })
            }
        }
    }

    // Pass in the gotten listing data as props into our listing table
    DataTable() {
        if(this.props.auth.isAuthenticated) {
            return this.state.cartItems.map((res, i) => {
                return <CartTable obj={res} key={i} user={this.props.auth.user} auth={this.props.auth.isAuthenticated} />;
            });
        }
        else {
           console.log(this.props.Items);
           return this.props.Items.map((res, i) => {
                return <CartTable obj={res} key={i} user={this.props.auth.user} auth={this.props.auth.isAuthenticated} />;
           });
        }
    }

    render(){
        while (!this.props.auth.isAuthenticated){
            if (!this.state.shouldLogin) {
                return (<h1>Loading...</h1>)
            }
            else {
                // Just a place holder for now, can make more fancy later
                return (
                    <div>
                        <h1>Your Cart</h1>
                        {this.DataTable()}
                    </div>
                );
            }
        }
        return (
            <div>
                <h1>Your Cart</h1>
                {this.DataTable()}
            </div>

        );
    }
}

// Stuff needed to get the authentication state interacting with the page's components
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    null
)(Cart);