import React, {Component} from 'react';
import { Card, Button } from 'react-bootstrap';
import ReactTextCollapse from 'react-text-collapse';

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
    render() {
        return (
            <div className="App" class="row">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://trinity-caskets-bucket.s3.amazonaws.com/casket.jpg" />
                    <Card.Body>
                        <Card.Title style={{textAlign: 'center'}}>#0000 &nbsp; Sample Casket</Card.Title>
                        <Card.Text>
                            <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
                                Description of CasketDescription of CasketDescription of CasketDescription of CasketDescription of CasketDescription of CasketDescription of CasketDescription of CasketDescription of CasketDescription of CasketDescription of CasketDescription of CasketDescription of CasketDescription of CasketDescription of CasketDescription of CasketDescription of CasketDescription of CasketDescription of Casket
                            </ReactTextCollapse>
                        </Card.Text>
                        <br />
                        <Card.Title>
                            $0000
                        </Card.Title>
                        <Button variant="primary">Add To Cart</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Listings;
