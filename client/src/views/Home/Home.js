import React from 'react';
import './Home.css';

class Home extends React.Component{
    render(){
        return (
            <div>
                <h1>Welcome to Trinity Casket Store.... And More!</h1>
                <p>Trinity Casket Store.... and More is a veteran owned and operated funeral goods retailer specializing in caskets, urns, and headstones. Funeral homes <b>must</b> accept our merchandise! For more information, see our <a href="/FAQ">Frequently Asked Questions.</a></p>
                <div id="column_box">
                  <div className="columns">
                    <h3>Our Location:</h3>
                    <p>1351 E. 43rd Street<br/>Gainesville, FL 32641</p>
                  </div>
                  <div className="columns">
                    <h3>Our Staff:</h3>
                    <p>Rafe Johnson, Sales Manager<br/>Orien Greene, Officer Manager</p>
                  </div>

                  <div className="columns">
                    <h3>Contact Us:</h3>
                    <p>(352) 575-7177<br/>(904) 485-2168<br/>saveattrinity23@gmail.com</p>
                  </div>
                </div>
            </div>
        );
    }
}

export default Home;
