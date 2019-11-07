import React, {Component} from 'react';
import { Card, Button } from 'react-bootstrap';

export class Listings extends Component {
    render() {
        return (
            <div className="App" class="row">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://trinity-caskets-bucket.s3.amazonaws.com/casket.jpg" />
                    <Card.Body>
                        <Card.Title style={{textAlign: 'center'}}>#0000 &nbsp; Sample Casket</Card.Title>
                        <Card.Text>
                            Description of Casket
                        </Card.Text>
                        <Card.Text>
                            $0000
                        </Card.Text>
                        <Button variant="primary">Add to Cart</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Listings;
