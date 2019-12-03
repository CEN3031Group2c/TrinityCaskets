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
            sumCalculated: false
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
                    this.sumItems()
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
        return this.state.cartItems.map((res, i) => {
            return <CartTable obj={res} key={i} user = {this.props.auth.user}/>;
        });
    }

    render(){
        while (!this.props.auth.isAuthenticated || !this.state.sumCalculated){
            if (!this.state.shouldLogin) {
                return (<h1>Loading...</h1>)
            }
            else {
                // Just a place holder for now, can make more fancy later
                return (<h1>Please log in</h1>)
            }
        }
        return (
            <div>
                <h1>Your Cart</h1>
                {this.DataTable()}
                <Paypal amount={this.state.sum}/>
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