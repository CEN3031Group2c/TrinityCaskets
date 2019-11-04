import React from 'react';
import './FQ.css';

function FQ() {

    // function Answer()
    // {
    //     console.log("hello")

    // }

    return (

        <div className="App">
            <header className="App-header">
                <div id="all_content_holder">
            <h1>Frequently Asked Questions</h1>
            <div className="DisplayQuestion">
                <h3 className="ActualQuestion">Q: Will funeral homes accept this merchandise?</h3>
                <button type="button" className="DisplayAnsw"></button>
            </div>
            {/* &#8211; */}
{/* <div className="DisplayQuestion"><h3 className="DisplayQuestion">Q: Will funeral homes accept this merchandise?</h3>
<div><button type="button" className="DisplayAnsw">&#8211;</button></div>
</div> */}

<h3>Q: Where would merchandise be delivered?</h3>
Answer: All caskets will be delivered to the funeral home of your choice. Urns, and programs, etc. delivered to families address

<h3>Q: How long delivery time?</h3>
Answer: 24- 48 hours anywhere in the USA.

<h3>Q: What forms of payment do you accept?</h3>
Answer: We accept the following forms of payment: Cash, Cash App, (visa, debt, master card sent to cash app)
</div>
            </header>
        </div>
    );
}

export default FQ;
