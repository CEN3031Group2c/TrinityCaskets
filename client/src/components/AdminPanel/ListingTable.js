import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class ListingTable extends Component {

    constructor(props) {
        super(props);
        this.deleteListing = this.deleteListing.bind(this);
    }

    deleteListing() {
        axios.delete('/api/listings/' + this.props.obj._id)
            .then((res) => {
                console.log('Listing successfully deleted!')
            }).catch((error) => {
            console.log(error)
        });

        window.location.reload();
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.modelNumber}</td>
                <td>{this.props.obj.description}</td>
                <td>{this.props.obj.price}</td>
                <td>{this.props.obj.type}</td>
                <td>
                    <Button onClick={() => { this.deleteListing() }} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}

export default ListingTable