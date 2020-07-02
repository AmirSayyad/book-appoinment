
import React, { Component, Refs } from 'react';
import { Link, withRouter } from 'react-router-dom';
import "./Login.css"

//import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  signIn = () => {
    let userName = this.refs.userName.value;
    let password = this.refs.password.value;
    console.log(userName);
    console.log(password);

    let user = window.btoa(userName + ':' + password);
    localStorage.setItem('user', JSON.stringify(user));
    this.props.history.replace('/');
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.signIn.bind(this)}>
          <div className="col">
            <input type="text" ref="userName" className="" placeholder="enter username" />
          </div>
          <div className="col">
            <input type="password" ref= "password" className="" placeholder="enter password" />
          </div>
          <div className="col">
            <button type = "submit" className="" >Sign In</button>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(Login);