import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AvailableTimes from "react-available-times";

import "react-datepicker/dist/react-datepicker.css";
import "./DefineSlot.css";
const BaseUri = 'https://stark-escarpment-52071.herokuapp.com/';

let rdata = [{"start":"2020-06-30T03:30:00.000Z","end":"2020-06-30T04:30:00.000Z"},{"start":"2020-06-30T04:30:00.000Z","end":"2020-06-30T06:00:00.000Z"},{"start":"2020-06-30T06:30:00.000Z","end":"2020-06-30T07:30:00.000Z"},{"start":"2020-06-30T07:30:00.000Z","end":"2020-06-30T08:30:00.000Z"},{"start":"2020-07-01T05:30:00.000Z","end":"2020-07-01T06:30:00.000Z"},{"start":"2020-07-01T07:30:00.000Z","end":"2020-07-01T08:30:00.000Z"},{"start":"2020-07-02T03:30:00.000Z","end":"2020-07-02T04:30:00.000Z"},{"start":"2020-07-02T04:30:00.000Z","end":"2020-07-02T05:30:00.000Z"},{"start":"2020-07-02T07:30:00.000Z","end":"2020-07-02T08:30:00.000Z"},{"start":"2020-07-03T03:30:00.000Z","end":"2020-07-03T07:30:00.000Z"},{"start":"2020-07-05T03:30:00.000Z","end":"2020-07-05T04:30:00.000Z"},{"start":"2020-07-05T04:30:00.000Z","end":"2020-07-05T05:30:00.000Z"},{"start":"2020-07-05T05:30:00.000Z","end":"2020-07-05T06:30:00.000Z"},{"start":"2020-07-05T09:30:00.000Z","end":"2020-07-05T10:30:00.000Z"},{"start":"2020-07-05T08:30:00.000Z","end":"2020-07-05T09:30:00.000Z"},{"start":"2020-07-05T07:30:00.000Z","end":"2020-07-05T08:30:00.000Z"},{"start":"2020-07-05T10:30:00.000Z","end":"2020-07-05T11:45:00.000Z"},{"start":"2020-07-05T12:30:00.000Z","end":"2020-07-05T13:30:00.000Z"},{"start":"2020-07-06T03:30:00.000Z","end":"2020-07-06T05:00:00.000Z"},{"start":"2020-07-06T05:30:00.000Z","end":"2020-07-06T06:30:00.000Z"},{"start":"2020-07-06T06:30:00.000Z","end":"2020-07-06T07:30:00.000Z"},{"start":"2020-07-06T07:30:00.000Z","end":"2020-07-06T08:30:00.000Z"},{"start":"2020-07-06T10:30:00.000Z","end":"2020-07-06T11:30:00.000Z"},{"start":"2020-07-06T09:30:00.000Z","end":"2020-07-06T10:30:00.000Z"},{"start":"2020-07-06T11:30:00.000Z","end":"2020-07-06T12:30:00.000Z"},{"start":"2020-07-07T03:30:00.000Z","end":"2020-07-07T08:30:00.000Z"},{"start":"2020-07-07T12:30:00.000Z","end":"2020-07-07T13:30:00.000Z"},{"start":"2020-07-07T09:30:00.000Z","end":"2020-07-07T10:30:00.000Z"},{"start":"2020-07-08T12:30:00.000Z","end":"2020-07-08T13:30:00.000Z"},{"start":"2020-07-08T11:30:00.000Z","end":"2020-07-08T12:30:00.000Z"},{"start":"2020-07-08T09:30:00.000Z","end":"2020-07-08T10:30:00.000Z"},{"start":"2020-07-08T10:30:00.000Z","end":"2020-07-08T11:30:00.000Z"},{"start":"2020-07-08T06:30:00.000Z","end":"2020-07-08T07:30:00.000Z"},{"start":"2020-07-08T07:30:00.000Z","end":"2020-07-08T08:30:00.000Z"},{"start":"2020-07-08T08:30:00.000Z","end":"2020-07-08T09:30:00.000Z"},{"start":"2020-07-08T04:30:00.000Z","end":"2020-07-08T05:30:00.000Z"},{"start":"2020-07-08T05:30:00.000Z","end":"2020-07-08T06:30:00.000Z"},{"start":"2020-07-09T03:30:00.000Z","end":"2020-07-09T04:30:00.000Z"},{"start":"2020-07-09T04:30:00.000Z","end":"2020-07-09T06:00:00.000Z"},{"start":"2020-07-09T06:30:00.000Z","end":"2020-07-09T07:30:00.000Z"},{"start":"2020-07-09T07:30:00.000Z","end":"2020-07-09T09:00:00.000Z"},{"start":"2020-07-09T09:30:00.000Z","end":"2020-07-09T10:30:00.000Z"},{"start":"2020-07-09T11:30:00.000Z","end":"2020-07-09T12:30:00.000Z"},{"start":"2020-07-10T11:30:00.000Z","end":"2020-07-10T12:30:00.000Z"}]


let dates = rdata.map((date) => {
  date.start = new Date(date.start);
  date.end = new Date(date.end);
  return date;
});

class DefineSlot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appoinments: null,
      selection: null,
      initDate: dates,
      loading: false,
      error: null
    };
  }

  getData = async () => {
    let sellerId = JSON.parse(localStorage.getItem('user'))._id;
    const uri = BaseUri.concat('slots/' + sellerId);
    const response = await fetch(uri, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const responseJson = await response.json();
    return responseJson;
  }

  useRequest = async () => {
    const responseJson = await this.getData();
    let dates = [];
    console.log(responseJson);
    debugger;
    responseJson.forEach(item => {
      dates = [...dates, ...item.slots]
    })
    dates = dates.map((date) => {
      date.start = new Date(date.start);
      date.end = new Date(date.end);
      return date;
    });
    this.setState({initDate: dates})
  }

  defineSlot() {
    const uri = BaseUri.concat('bookslots');
    this.setState({ loading: true });
    let sellerId = JSON.parse(localStorage.getItem('user'))._id;
    const body = { slots: this.state.selection, seller_id: sellerId };
    fetch(uri, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ loading: false });
        if (responseJson.hasOwnProperty('error')) {
          this.setState({
            error: responseJson.error,
            loading: false
          })
        }
        alert('Times slots booked succefully!');
      })
      .catch((error) => {
        this.setState({ loading: false });
        alert('Error booking slots');
      })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h2> Select Time Slots </h2>
            <AvailableTimes
              weekStartsOn="monday"
              calendars={[
                {
                  id: "work",
                  title: "Work",
                  foregroundColor: "#ff00ff",
                  backgroundColor: "#f0f0f0",
                  selected: true,
                }
              ]}
              onChange={(selections) => {
                this.setState({ selection: selections });
              }}
              initialSelections={this.state.initDate}
              height={500}
              width={600}
              recurring={false}
              availableDays={[
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
              ]}
              availableHourRange={{ start: 9, end: 19 }}
            />

            <hr className="my-4" />

            <button
              className="btn btn-book"
              onClick={() => {
                this.defineSlot();
              }}
              disabled={this.state.loading}
            >
              Save Available Slots
            </button>

            {this.state.error && <div className="col">
              <div className={'alert alert-danger'}>{this.state.error}</div>
            </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DefineSlot);
