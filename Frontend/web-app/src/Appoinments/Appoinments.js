import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import moment from "moment"
import "./Appoinments.css";
const BaseUri = 'https://stark-escarpment-52071.herokuapp.com/';
class Appoinments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appoinments: [],
      loading: true
    };
  }

  componentDidMount() {
    let sellerId = JSON.parse(localStorage.getItem('user'))._id;
    const uri = BaseUri.concat('bookings/'+sellerId);
    console.log(uri);
    fetch(uri, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({appoinments: responseJson, loading: false});
      })
      .catch((error) => {
        alert('Error accepting booking');
      })
  }

  accept(item, index) {
    const uri = BaseUri.concat('booking/update/'+item._id);
    console.log(uri)
    fetch(uri, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({status: 'rejected'})
    }).then((response) => response.json())
      .then((responseJson) => {
        const data = this.state.appoinments;
        data.splice(index, 1)
        this.setState({
          appoinments: data,
        });
    
      })
      .catch((error) => {
        alert('Error accepting booking');
      })
  }

  reject(item, index) {
    const uri = BaseUri.concat('booking/update/'+item._id);
    fetch(uri, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({status: 'rejected'})
    }).then((response) => response.json())
      .then((responseJson) => {
        const data = this.state.appoinments;
        data.splice(index, 1)
        this.setState({
          appoinments: data,
        });
    
      })
      .catch((error) => {
        alert('Error accepting booking');
      })
  }

  render() {
    const { appoinments } = this.state;
    if(this.state.loading) return (<div className="container"><h3>Loding...</h3></div>)
    return (
      <div className="container">
        <div className="row table head">
          <p>Name</p>
          <p>email</p>
          <p>Phone</p>
          <p>Date</p>
          <p>slot</p>
          <p>status</p>
          <p>Action</p>
        </div>
        {appoinments.length > 0 ? appoinments.map((item, index) => (
          <div className={'row table data ' + (item.booking_status == "pending" ? 'pending' : '')} key="{index}">
            <p>{item.buyer_name}</p>
            <p>{item.buyer_email}</p>
            <p>{item.buyer_phone}</p>
            <p>{moment(item.date).format('LL')}</p>
            <p>{item.time_slot}</p>
            <p>{item.booking_status}</p>
            <p>
              <button
                className="btn btn-accept"
                disabled={item.booking_status !== "pending"}
                onClick={() => {
                  this.accept(item, index);
                }}
              >
                Accept
              </button>
              <button
                className="btn btn-reject"
                disabled={item.booking_status !== "pending"}
                onClick={() => {
                  this.reject(item, index);
                }}
              >
                Reject
              </button>
            </p>
          </div>
        )) :
        <h2>No Data Found</h2>
        }
        
      </div>
    );
  }
}

export default withRouter(Appoinments);
