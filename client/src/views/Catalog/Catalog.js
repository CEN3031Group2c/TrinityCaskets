import React from 'react';
import Listings from "../../components/Listings/Listings"
import './Catalog.css';

function Catalog() {
    return (
        <div className="App" class="centered">
            <Listings type="casket" />
        </div>
    );
}
export default Catalog;
