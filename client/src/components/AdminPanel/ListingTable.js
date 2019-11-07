import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import {Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader} from "reactstrap";

class ListingTable extends Component {

    constructor(props) {
        super(props);
        this.deleteListing = this.deleteListing.bind(this);
        this.state = {
            modal: false,
            modelNumber: '',
            description: '',
            price: '',
            type: ''
        };
    }

    // Delete a listing
    deleteListing() {
        axios.delete('/api/listings/' + this.props.obj._id)
            .then((res) => {
                console.log('Listing successfully deleted!')
            }).catch((error) => {
            console.log(error)
        });

        window.location.reload();
    }

    // Update form
    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    // Open/close the edit window when clicked
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    // Edit the listing with the changes made
    onSubmit = e => {
        console.log("Here");
        e.preventDefault();
        const newListing = {
            modelNumber: this.state.modelNumber,
            description: this.state.description,
            price: this.state.price,
            type: this.state.type
        };

        axios.put('/api/listings/' + this.props.obj._id, newListing)
            .then(res => console.log(res.data));

        //this.toggle();
        window.location.reload();
    };

    render() {
        console.log(this.state.modal);
        return (
            <tr>
                <td>{this.props.obj.modelNumber}</td>
                <td>{this.props.obj.description}</td>
                <td>{this.props.obj.price}</td>
                <td>{this.props.obj.type}</td>
                <td>
                    <Button onClick={() => { this.toggle() }} size="sm" variant="primary">Edit</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Edit Listings</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for='modelNumber'>Model Number</Label>
                                    <Input
                                        type='modelNumber'
                                        name='modelNumber'
                                        id='modelNumber'
                                        defaultValue={this.props.obj.modelNumber}
                                        onChange={(value) => this.onChange(value)}
                                        placeholder='Model Number'
                                        className='mb-3'
                                    />

                                    <Label for='description'>Description</Label>
                                    <Input
                                        type='description'
                                        name='description'
                                        id='description'
                                        defaultValue={this.props.obj.description}
                                        onChange={(value) => this.onChange(value)}
                                        placeholder='Description'
                                        className='mb-3'
                                    />

                                    <Label for='price'>Price</Label>
                                    <Input
                                        type='price'
                                        name='price'
                                        id='price'
                                        defaultValue={this.props.obj.price}
                                        onChange={(value) => this.onChange(value)}
                                        placeholder='$$$'
                                        className='mb-3'
                                    />

                                    <Label for='type'>Type</Label>
                                    <Input
                                        type='select'
                                        name='type'
                                        id='type'
                                        onChange={(value) => this.onChange(value)}
                                        defaultValue={this.props.obj.type}
                                        placeholder='Type'
                                        className='mb-3'>
                                        <option>Casket</option>
                                        <option>Urn</option>
                                        <option>Headstone</option>
                                    </Input>

                                    <Button type='submit' color='dark' style={{ marginTop: '2rem' }} block>
                                        Save Changes
                                    </Button>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                    </Modal>
                    &nbsp;&nbsp;&nbsp;
                    <Button onClick={(e) => { if (window.confirm('Are you sure you want to delete this item?'))
                        this.deleteListing(e) }}
                            size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}

export default ListingTable