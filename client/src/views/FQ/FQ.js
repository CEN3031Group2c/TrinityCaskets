import React, { Component } from 'react';
import './FQ.css';

class FQ2 extends React.Component {
    constructor()
    {
        super();
        this.state=
        {
            op1: false,
            op2: false,
            op3: false,
            op4: false
        }
    }

    onClick1()
    {
        if(this.state.op1)
        {this.setState({op1:false}) }
        else
        {this.setState({op1:true})}
    }

    onClick2()
    {
        if(this.state.op2)
        {this.setState({op2:false}) }
        else
        {this.setState({op2:true})}
    }

    onClick3()
    {
        if(this.state.op3)
        {this.setState({op3:false}) }
        else
        {this.setState({op3:true})}
    }

    onClick4()
    {
        if(this.state.op4)
        {this.setState({op4:false}) }
        else
        {this.setState({op4:true})}
    }

render()
{
   return (
       <div>
           <h1>Frequently Asked Questions</h1>
           <div id="all_questions">
             <div className="DisplayQuestion">
                 <h3 className="ActualQuestion">
                    Q: Will funeral homes accept this merchandise?
                  </h3>
                 <button type="button" className="DisplayB" onClick = {this.onClick1.bind(this)}></button>
              </div>

              { this.state.op1 ?
                <div className="DisplayAns" >
                  <p>Yes, federal and state law require that all funeral homes must accept all individually purchased merchandise.</p>
                </div>
              : null }

            <div className="DisplayQuestion">
                <h3 className="ActualQuestion" >
                  Q: Where will merchandise be delivered?
                </h3>
                <button type="button" className="DisplayB" onClick = {this.onClick2.bind(this)}></button>
            </div>

            { this.state.op2 ?
              <div className="DisplayAns" >
                <p>All caskets will be delivered to the funeral home of your choice. Urns, programs, etc. will be delivered to the family's address.</p>
              </div>
            : null }

            <div className="DisplayQuestion">
              <h3 className="ActualQuestion" >
                Q: How long will merchandise take to deliver?
              </h3>
              <button type="button" className="DisplayB" onClick = {this.onClick3.bind(this)}>  </button>
            </div>
            {this.state.op3 ?
              <div className="DisplayAns" >
                 <p> 24-48 hours anywhere in the USA.</p>
              </div>
            : null }

            <div className="DisplayQuestion">
              <h3 className="ActualQuestion" >
                  Q: What forms of payment do you accept?
              </h3>
                <button type="button" className="DisplayB" onClick = {this.onClick4.bind(this)}>  </button>
            </div>
            {this.state.op4 ?
              <div className="DisplayAns" >
                 <p> We accept the following forms of payment: Cash, Cash App, (visa, debt, master card sent to cash app)</p>
              </div>
            : null }
          </div>
       </div>
   );

}}

export default FQ2;
