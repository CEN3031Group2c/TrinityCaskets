import React, { Component} from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap';

import PropTypes from 'prop-types';
import { registerA } from '../../redux/actions/authActions';
import { returnErrors } from '../../redux/actions/errorActions';
import { connect } from 'react-redux';

class NewAdmin extends Component{

    constructor(props) {
        super(props);

        // Setting up functions
        this.NameChanged = this.NameChanged.bind(this);
        this.EmailChanged = this.EmailChanged.bind(this);
        this.PasswordChanged = this.PasswordChanged.bind(this);
        this.PasswordChanged2 = this.PasswordChanged2.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            Name: '',
            Email: '',
            Password: '',
            Password2: '',
            admin: true,
            complete: false,

            //message for troubles
            msg: null
        }
    }

    static propTypes = {
         error: PropTypes.object.isRequired
    };

    NameChanged(e) {
        this.setState({ Name: e.target.value })
    }

    EmailChanged(e) {
        this.setState({ Email: e.target.value })
    }

    PasswordChanged(e) {
        this.setState({ Password: e.target.value })
    }

    PasswordChanged2(e) {
        this.setState({ Password2: e.target.value })
    }



    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            if (error.id === 'REGISTER_FAIL') {
                {console.log("It happen 4")}
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.state.Password === this.state.Password2)
        {

            this.setState({
                msg: null
            })
         

        const newAdmin = {
            name: this.state.Name,
            email: this.state.Email,
            password: this.state.Password,
            admin: this.state.admin,
            item: ''
        };

        this.props.registerA(newAdmin);

        const { error } = this.props;
            if (error.id !== 'REGISTER_FAIL') 
            {
                this.setState({
                    complete: 'true'
                });
            }
        
    }
    else
    {
        this.setState({
            msg: 'Password is not the same'
        })
    }
    }

    render() {
        if (this.state.complete){
            return(
                <div>
                    <center><h1>New administrator has being created!</h1></center>
                    <center><a href="/Home">
                        <div className = "nav_button">
                            Continue
                        </div>
                    </a></center>
                </div>)
        }
        return (
            <div className="form-wrapper">
                {this.state.msg ? (
                            <Alert color='danger'>{this.state.msg}</Alert>
                        ) : null}
                <center><h1>New Admin</h1></center>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for='Name'>Name</Label>
                        <Input
                            type='Name'
                            name='Name'
                            id='Name'
                            placeholder='Admin name'
                            className='mb-3'
                            onChange={this.NameChanged}
                        />

                        <Label for='Email'>Email</Label>
                        <Input
                            type='Email'
                            name='Email'
                            id='Email'
                            placeholder='Admin Email'
                            className='mb-3'
                            onChange={this.EmailChanged}
                        />

                        <Label for='Password'>Password</Label>
                        <Input
                            type='Password'
                            name='Password'
                            id='Password'
                            placeholder='Admin password'
                            className='mb-3'
                            onChange={this.PasswordChanged}
                        />

                        <Label for='Password2'>Confirm Password</Label>
                        <Input
                            type='Password'
                            name='Password2'
                            id='Password2'
                            placeholder='Confirm Admin password'
                            className='mb-3'
                            onChange={this.PasswordChanged2}
                        />

                        <Button color='dark' style={{ marginTop: '2rem' }} block>
                            Add New Admin
                        </Button>
                    </FormGroup>
                </Form>
            </div>);

    }
}

// Set the state of authentication based on props
const mapStateToProps = state => ({
    error: state.error
});

export default connect(
    // Actually allow us to add new
    mapStateToProps,
    { registerA, returnErrors }
)(NewAdmin);

// export default NewAdmin;