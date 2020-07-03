import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from './Navbar/Navbar';
import Appoinments from "./Appoinments/Appoinments";
import Login from "./Login/Login";
import DefineSlot from "./DefineSlot/DefineSlot";
import AuthRoute from "./Auth/Auth"


class App extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        user: null
      };
  }

  logout = () => {
    localStorage.clear();
    this.setState({
      user: null
    })
  }

  updateUser = () => {
    this.setState({
      user: localStorage.getItem('user')
    })
  }

  render() {
    return (
      <div>
        <NavBar logout={this.logout} user={this.state.user} />
        <AuthRoute exact path='/' component={Appoinments} />
        <AuthRoute exact path='/defineSlot' component={DefineSlot} />
        <Route exact path='/login' component={Login} />
      </div>
    );
  }
}
export default App;
