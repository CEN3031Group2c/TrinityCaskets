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
// Using redux to handle all this
import { connect } from 'react-redux';
// So we can set the types of our props
import PropTypes from 'prop-types';

import { register } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';

class RegisterWindow extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        admin: false,
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

    // Check if it changed, i.e. new user successfully authenticated
    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check if registered successfully
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // If authenticated, close window
        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }

    // Open the registration form
    toggle = () => {
        // Initially clear errors
        this.props.clearErrors();
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
        const { name, email, password, admin } = this.state;

        // Create a new user object with the passed in data
        const newUser = {
            name,
            email,
            password,
            admin
        };

        // Attempt to register the new user
        this.props.register(newUser);
    };

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href='#'>
                    <div id="signup">register</div>
                </NavLink>

                <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggle}
                  className="modal_content"
                  overlayClassName="modal"
                >
                    <ModalHeader toggle={this.toggle} id="header">Register</ModalHeader>
                    <ModalBody id="body">
                        {this.state.msg ? (
                            <Alert color='danger'>{this.state.msg}</Alert>
                        ) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='name'>FULL NAME: </Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='name'
                                    placeholder='Name'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Label for='email'>EMAIL: </Label>
                                <Input
                                    type='email'
                                    name='email'
                                    id='email'
                                    placeholder='Email'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Label for='password'>PASSWORD: </Label>
                                <Input
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder='Password'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Button color='dark' id="submit_button" block>
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

// Set the state of authentication based on props
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    // Actually allow us to register
    mapStateToProps,
    { register, clearErrors }
)(RegisterWindow);
