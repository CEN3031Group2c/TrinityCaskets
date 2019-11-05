import React from 'react';
import logo from '../../assets/logo.svg';
import './Home.css';

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>future TrinityCaskets website.</p>
            </header>
        </div>
    );
}

export default Home;