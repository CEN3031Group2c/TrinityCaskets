import React, {Component} from 'react';
import axios from 'axios'
import {connect} from "react-redux";
import CartTable from '../../components/Cart/CartTable'
import Paypal from '../../components/Payment/Paypal';


class Cart extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            shouldLogin: false,
            sum: 0.01,
            sumCalculated: false,
            clientId: undefined
        };
    }

    // Because user authentication doesn't load immediately, need to define it once it's ready
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.clientId)
            this.getClientId();
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
                    this.sumItems();
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

    async getClientId() {
        var clientId = await axios.get('/api/cart/client-id');
        this.setState({
            clientId: "" + clientId.data
        });
    }

    async sumItems() {
        var sum = 0;

        for (var i in this.state.cartItems) {
            if (this.state.cartItems[i].product) {
                await axios.get('/api/listings/'+ this.state.cartItems[i].product).then(res => {
                    sum += res.data.price
                })
            }
        }
        this.setState({
            sum: sum,
            sumCalculated: true
        })

        console.log('sumCalculated:' + this.state.sum)
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
                return <CartTable obj={res} key={i} user={this.props.auth.user} auth={this.props.auth.isAuthenticated} items={this.props.Items} />;
           });
        }
    }

    render(){
        while (!this.props.auth.isAuthenticated || !this.state.sumCalculated || !this.state.clientId){
            if (!this.state.shouldLogin) {
                return (<h1>Loading...</h1>)
            }
            else {
                if(this.props.Items.length == 0) {
                    return (
                        <div>
                            <h1>No Items in Cart</h1>
                        </div>
                    );
                }
                else {
                    return (
                        <div>
                            <h1>Your Cart</h1>
                            {this.DataTable()}
                        </div>
                    );
                }
            }
        }
        return (
            <div>
                <h1>Your Cart</h1>
                {this.DataTable()}
                <p>Please note that before or after purchasing, you will have to contact us to decide where we will ship your item(s).</p>
                <Paypal amount={this.state.sum} clientId={this.state.clientId}/>
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