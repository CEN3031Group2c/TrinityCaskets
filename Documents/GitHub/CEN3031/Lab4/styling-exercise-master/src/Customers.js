import React, {Component} from 'react';
import CustomerDetails from './CustomerDetails'
import axios from 'axios'

export default class Customers extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedCustomer: 1
    }
  }

  componentDidMount() {
    this.getCustomerData();
  }

  getCustomerData() {
    axios.get('assets/samplejson/customerlist.json').then(response => {
      this.setState({customerList: response})
    })
  };

  render() {
    if (!this.state.customerList)
      return (<p>Loading data</p>)
    return (
    <div className="container-fluid">
       
        {
          this.state.customerList.data.map(customer => 
          <div className="card" style={{width:'300px'}} key={customer.name}>
            <img className="card-img-top" src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt="Card image" />
            <div className="card-body">
              <div className="card-title">
                <strong>{customer.name}</strong>
              </div>
              <div className="card-text">
                <p>{customer.email}</p>
                <p>{customer.phone}</p>
                <button style={{backgroundColor:'#b19cd9',border:'none',borderRadius:'25px'}} onClick={() => this.setState({selectedCustomer: customer.id})} data-toggle="modal" data-target="#exampleModalCenter">
                  View Details
                </button>
              </div>
            </div>
          </div>
          )
        }
        
      
      
        <CustomerDetails val={this.state.selectedCustomer}/>
      
    </div>
    )
  }

}
