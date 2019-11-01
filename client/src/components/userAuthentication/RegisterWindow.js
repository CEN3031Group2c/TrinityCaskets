import React, { Component } from 'react';
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
// So we can set the types of our props
import PropTypes from 'prop-types';

// Allow our updating of user login state
import { register } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';

class RegisterWindow extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        // Register successful?
        msg: null
    };

    // Set the types for our props
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    // Open the registration form
    toggle = () => {
        // !open (closed) -> open
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = change => {
        this.setState({ [change.target.name]: change.target.value });
    };

    onSubmit = submit => {
        submit.preventDefault();

        // Pass in the name, email, and password
        const { name, email, password } = this.state;

        // Create a new user object with the passed in data
        const newUser = {
            name,
            email,
            password
        };

        // Attempt to register the new user
        this.props.register(newUser);
    };

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href='#'>
                    Register
                </NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (
                            <Alert color='danger'>{this.state.msg}</Alert>
                        ) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='name'>Full Name</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='name'
                                    placeholder='Name'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

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
                                    Register
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default RegisterWindow;