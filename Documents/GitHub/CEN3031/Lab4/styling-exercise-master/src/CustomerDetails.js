import React, {Component} from 'react';
import axios from 'axios'

export default class CustomerDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.getCustomerDetails(this.props.val)
  }

  componentDidUpdate(prevProps) {

    if (this.props.val !== prevProps.val) {
      this.getCustomerDetails(this.props.val)
    }
  }

  getCustomerDetails(id) {
    axios.get('assets/samplejson/customer' + id + '.json').then(response => {
      this.setState({customerDetails: response})
    })
  };

  render() {
    if (!this.state.customerDetails)
      return (<p>Loading Data</p>)
    return (
          
        
          
          <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header"  style={{backgroundColor:'#b19cd9'}}>
                  <h5 className="modal-title" id="exampleModalLongTitle">{this.state.customerDetails.data.name}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Name : {this.state.customerDetails.data.name}</p>
                  <p>Email : {this.state.customerDetails.data.email}</p>
                  <p>Phone : {this.state.customerDetails.data.phone}</p>
                  <p>City : {this.state.customerDetails.data.city}</p>
                  <p>State : {this.state.customerDetails.data.state}</p>
                  <p>Country : {this.state.customerDetails.data.country}</p>
                  <p>Organization : {this.state.customerDetails.data.organization}</p>
                  <p>Job Profile : {this.state.customerDetails.data.jobProfile}</p>
                  <p>Additional Info : {this.state.customerDetails.data.additionalInfo}</p>
                  <p>Surname: </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        
    

    
    )
  }
}
