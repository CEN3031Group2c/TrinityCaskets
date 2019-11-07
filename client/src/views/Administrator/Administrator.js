
import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ListingTable from '../../components/AdminPanel/ListingTable';


class Administrator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listings: []
        };
    }

    componentDidMount() {
        axios.get('/api/listings').then(res => {
            this.setState({
                listings: res.data
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    // Pass in the gotten listing data as props into our listing table
    DataTable() {
        return this.state.listings.map((res, i) => {
            return <ListingTable obj={res} key={i} />;
        });
    }


    render() {
        return (<div className="table-wrapper">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Model Number</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>
                {this.DataTable()}
                </tbody>
            </Table>
        </div>);
    }
}

export default Administrator
