import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";



class NavBar extends React.Component {

  constructor(props) {
    super(props)
  }


  render() {
    let loggedIn = (
      <ul className="nav sub-nav right">
        <li><Link className="" to="/defineSlot">Set Slot</Link></li>
        <li><Link className="" to="/">Appoinments</Link></li>
      </ul>
    )

    return (
      <nav className="navbar">
        <Link className="" to="/">
          <b>Seller Panel</b>
        </Link>
        {loggedIn}
      </nav >
    );
  }

}

export default NavBar;
