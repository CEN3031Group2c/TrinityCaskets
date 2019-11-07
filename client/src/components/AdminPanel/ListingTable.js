import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class ListingTable extends Component {

    constructor(props) {
        super(props);
        //this.deleteStudent = this.deleteStudent.bind(this);
    }

    /*deleteStudent() {
        axios.delete('http://localhost:4000/students/delete-student/' + this.props.obj._id)
            .then((res) => {
                console.log('Student successfully deleted!')
            }).catch((error) => {
            console.log(error)
        })
    }*/

    render() {
        return (
            <tr>
                <td>{this.props.obj.modelNumber}</td>
                <td>{this.props.obj.description}</td>
                <td>{this.props.obj.price}</td>
                <td>{this.props.obj.type}</td>
            </tr>
        );
    }
}

export default ListingTable