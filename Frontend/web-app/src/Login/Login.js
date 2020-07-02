
import React, { Component, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import "./Login.css"

//import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
    this.userName = React.createRef();
    this.password = React.createRef();
  }

  signIn = (e) => {
    e.preventDefault();
    let userName = this.userName.current.value;
    let password = this.password.current.value;
    console.log(this.userName)
    const BaseUri = 'http://localhost:5000/login';
    const uri = BaseUri;
    this.setState({loading: true});
    fetch(uri, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userName, password: password })
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({loading: false});
        if (responseJson.hasOwnProperty('error')) {
          this.setState({
            error: responseJson.error,
            loading: false
          })
        }
        console.log(responseJson);
        localStorage.setItem('user', JSON.stringify(responseJson.user));
        this.props.history.replace('/');

      })
      .catch((error) => {
        this.setState({loading: false});
        alert('Error Login');
      })
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.signIn.bind(this)}>
          <div className="col">
            <input type="text" ref={this.userName} className="" placeholder="enter username" />
          </div>
          <div className="col">
            <input type="password" ref={this.password} className="" placeholder="enter password" />
          </div>
          <div className="col">
            <button type="submit" className="" disabled={this.state.loading}>Sign In</button>
          </div>

          {this.state.error && <div className="col">
            <div className={'alert alert-danger'}>{this.state.error}</div>
          </div>
          }
        </form>
      </div>
    )
  }
}

export default withRouter(Login);