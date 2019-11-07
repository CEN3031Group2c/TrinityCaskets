import React, { Component} from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
} from 'reactstrap';
import axios from 'axios'

class Admin extends Component{

    constructor(props) {
        super(props);

        // Setting up functions
        this.modelNumberChanged = this.modelNumberChanged.bind(this);
        this.descriptionChanged = this.descriptionChanged.bind(this);
        this.priceChanged = this.priceChanged.bind(this);
        this.typeChanged = this.typeChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            modelNumber: '',
            description: '',
            price: '',
            type: ''
        }
    }

    modelNumberChanged(e) {
        this.setState({ modelNumber: e.target.value })
    }

    descriptionChanged(e) {
        this.setState({ description: e.target.value })
    }

    priceChanged(e) {
        this.setState({ price: e.target.value })
    }

    typeChanged(e) {
        this.setState({ type: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();

        const newListing = {
            modelNumber: this.state.modelNumber,
            description: this.state.description,
            price: this.state.price,
            type: this.state.type
        };
        console.log(newListing)

        axios.post('/api/listings', newListing)
            .then(res => console.log(res.data));

        this.setState({
            modelNumber: '',
            description: '',
            price: '',
            type: ''
        });
    }

    render() {
        return (
            <div className="form-wrapper">
                <center><h1>New Listing</h1></center>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for='modelNumber'>Model Number</Label>
                        <Input
                            type='modelNumber'
                            name='modelNumber'
                            id='modelNumber'
                            placeholder='Model Number'
                            className='mb-3'
                            onChange={this.modelNumberChanged}
                        />

                        <Label for='description'>Description</Label>
                        <Input
                            type='description'
                            name='description'
                            id='description'
                            placeholder='Description'
                            className='mb-3'
                            onChange={this.descriptionChanged}
                        />

                        <Label for='price'>Price</Label>
                        <Input
                            type='price'
                            name='price'
                            id='price'
                            placeholder='Price'
                            className='mb-3'
                            onChange={this.priceChanged}
                        />

                        <Label for='type'>Type</Label>
                        <Input
                            type='type'
                            name='type'
                            id='type'
                            placeholder='Type'
                            className='mb-3'
                            onChange={this.typeChanged}
                        />

                        <Button color='dark' style={{ marginTop: '2rem' }} block>
                            Create listing
                        </Button>
                    </FormGroup>
                </Form>
            </div>);
    }
}

export default Admin;