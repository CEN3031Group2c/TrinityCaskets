import React, {Component} from 'react';
import axios from 'axios'
import {connect} from "react-redux";
import CartTable from '../../components/Cart/CartTable'
import Table from "react-bootstrap/Table";


class Cart extends React.Component{

    constructor(props) {
        super(props);
        this.getTable = this.getTable.bind(this);
        this.state = {
            cartItems: []
        };
    }

    getTable() {
        const user = {
            id: this.props.auth.user._id
        };
        console.log(user);
        axios.get('/api/cart', {params: user}).then(res => {
            console.log(res.data);
            this.setState({
                cartItems: res.data
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    // Pass in the gotten listing data as props into our listing table
    DataTable() {
        console.log(this.state.cartItems);

        return this.state.cartItems.map((res, i) => {
            return <CartTable obj={res} key={i} />;
        });
    }

    render(){
        while (!this.props.auth.isAuthenticated){
                return(<h1>Loading...</h1>)
        }
        return (
            <div className="table-wrapper">

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Model Number</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Type</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.getTable(this.props.auth)}
                    {this.DataTable()}
                    </tbody>
                </Table>
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