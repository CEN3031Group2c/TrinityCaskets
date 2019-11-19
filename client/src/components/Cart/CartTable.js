import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import {Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader} from "reactstrap";

class CartTable extends Component {

    constructor(props) {
        super(props);
        //this.deleteFromCart = this.deleteFromCart.bind(this);
        this.state = {
            modal: false,
            modelNumber: '',
            description: '',
            price: '',
            image: '',
            type: ''
        };
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <h1>Cart of</h1>
                <tr>
                    <td>{this.props.obj.modelNumber}</td>
                    <td>{this.props.obj.description}</td>
                    <td><p1>$ </p1>{this.props.obj.price}</td>
                    <td>
                        {this.props.obj.image !== undefined ?
                            <img src={this.props.obj.image} width={286} height={230} mode='fit'/> :
                            <p1>No Image</p1>
                        }
                    </td>
                    <td>{this.props.obj.type}</td>
                    <td>
                        <Button size="sm" variant="danger">X</Button>
                    </td>
                </tr>
            </div>
        );
    }
}

export default CartTable