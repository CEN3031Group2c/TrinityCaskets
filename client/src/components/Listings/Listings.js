import React, {Component} from 'react';
import { Card, Button } from 'react-bootstrap';
import ReactTextCollapse from 'react-text-collapse';
import axios from 'axios'

const TEXT_COLLAPSE_OPTIONS = {
    collapse: false, // default state when component rendered
    collapseText: 'More Info', // text to show when collapsed
    expandText: 'Less Info', // text to show when expanded
    minHeight: 50, // component height when closed
    maxHeight: 250, // expanded to
    textStyle: { // pass the css for the collapseText and expandText here
      color: "blue",
      fontSize: "12px"
    }
}

export class Listings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    
    componentDidMount() {
        axios.get('/api/listings/')
        .then(response => {
            this.setState({
                data: response.data
            })
        });
    }

    render() {
        const backendData = this.state.data;
        const casketList = backendData
        .filter(listing => {
            return listing.type.toLowerCase() == this.props.type
        })
        .map(listing => {
            return (
                <div style={{margin: 5}}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={listing.image} />
                        <Card.Body>
                            <Card.Title style={{textAlign: 'center'}}>Model Number: #{listing.modelNumber}</Card.Title>
                            <Card.Text>
                                <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
                                    {listing.description}
                                </ReactTextCollapse>
                            </Card.Text>
                            <br />
                            <Card.Title>
                                ${listing.price}
                            </Card.Title>
                            <Button variant="primary">Add To Cart</Button>
                        </Card.Body>
                    </Card>
                </div>
            );
        });
        return <div className="App" class="row" style={{marginLeft: 15}}>{casketList}</div>
    }
}

export default Listings;
