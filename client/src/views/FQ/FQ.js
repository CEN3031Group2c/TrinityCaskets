import React from 'react';
import './FQ.css';

function FQ() {

    return (
            <div>
              <h1>Frequently Asked Questions</h1>
              <div id="all_questions">
                <div className="question">
                <div className="DisplayQuestion">
                    <h3 className="ActualQuestion">Q: Will funeral homes accept this merchandise?</h3>
                    <button type="button" className="DisplayAnsw"></button>
                </div>
                </div>
              <div className="question">
                <h3>Q: Where would merchandise be delivered?</h3>
                  <p>
                    <b>Answer:</b> All caskets will be delivered to the funeral home of your choice. Urns, and programs, etc. delivered to families address
                  </p>
              </div>
              <div className="question">
                <h3>Q: How long is delivery time?</h3>
                  <p>
                    <b>Answer:</b> 24- 48 hours anywhere in the USA.
                  </p>
              </div>
              <div className="question">
                <h3>Q: What forms of payment do you accept?</h3>
                  <p>
                    <b>Answer:</b> We accept the following forms of payment: Cash, Cash App, (visa, debt, master card sent to cash app)
                  </p>
              </div>
              </div>
            </div>
          );
}

export default FQ;
