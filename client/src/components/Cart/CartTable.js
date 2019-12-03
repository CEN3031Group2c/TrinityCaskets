import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";

class CartTable extends Component {

    constructor(props) {
        super(props);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.state = {
            modal: false,
            modelNumber: '',
            description: '',
            price: '',
            image: '',
            type: '',
            cartItems: []
        };
    }

    // Delete a listing
    removeFromCart() {
        if(this.props.auth) {
            const listingToDelete = {
                user: this.props.user,
                product: this.props.obj
            };
            axios.delete('/api/cart/', {data: listingToDelete}).then(res => {
                console.log('Successfully deleted')
            });
        }
        else {
            var array = this.props.items;
            var index = array.indexOf(this.props.obj);
            if(index !== -1) {
                array.splice(index, 1);
                this.setState({
                    items: array 
                });
            }
        }   

        window.location.reload();
    }

    componentDidMount() {
        console.log(this.props.obj.product);
        if(this.props.auth) {
            axios.get('/api/listings/'+this.props.obj.product).then(res => {
                this.setState({
                    cartItems: res.data
                })
            })
        }
        else {
            this.setState({
                cartItems: this.props.obj
            })
        }
    }

    render() {
        console.log(this.state.cartItems);
        return (
            <div className="table-wrapper">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th>Model Number</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                <tr>
                    <td>
                       {(this.state.cartItems.image != "") ?
                            <img src={this.state.cartItems.image} width={80} height={64} mode='fit'/> :
                            <img src='https://trinity-caskets-bucket.s3.amazonaws.com/no-image-available.jpg' width={80} height={64} mode='fit'/>}
                    </td>
                    <td>{this.state.cartItems.modelNumber}</td>
                    <td>{this.state.cartItems.description}</td>
                    <td><p>$ </p>{this.state.cartItems.price}</td>

                    <td>{this.state.cartItems.type}</td>
                    <td>
                        <Button onClick={(e) => {this.removeFromCart(e)}} size="sm" variant="danger">Remove From Cart</Button>
                    </td>
                </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default CartTable