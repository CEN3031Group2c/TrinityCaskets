import React, {Component} from 'react';
import { Card, Button } from 'react-bootstrap';

export class Listings extends Component {
    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://trinity-caskets-bucket.s3.amazonaws.com/casket.jpg" />
                <Card.Body>
                    <Card.Title>Sample Casket</Card.Title>
                    <Card.Text>
                        Description of Casket
                    </Card.Text>
                    <Button variant="primary">Add to Cart</Button>
                </Card.Body>
            </Card>
        );
    }
}

export default Listings;
