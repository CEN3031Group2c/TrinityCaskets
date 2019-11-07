import React, { Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
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
            type: '',
            canLeave: false
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
        console.log(e.target.value);
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

        axios.put('/api/listings', newListing)
            .then(res => console.log(res.data));

        this.setState({
            modelNumber: '',
            description: '',
            price: '',
            type: '',
            canLeave: true
        });
    }

    render() {
        if (this.state.canLeave){
            return(
                <div>
                    <center><h1>Listing Added Successfully!</h1></center>
                    <center><a href="/Admin">
                        <div className = "nav_button">
                            Click to return to listings
                        </div>
                    </a></center>
                </div>)
        }
        return (
            <div>
                <NavLink onClick={this.toggle} href='#'>
                    Edit Listing
                </NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (
                            <Alert color='danger'>{this.state.msg}</Alert>
                        ) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='email'>Email</Label>
                                <Input
                                    type='email'
                                    name='email'
                                    id='email'
                                    placeholder='Email'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Label for='password'>Password</Label>
                                <Input
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder='Password'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Button color='dark' style={{ marginTop: '2rem' }} block>
                                    Login
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );

    }
}

export default Admin;