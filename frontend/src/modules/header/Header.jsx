import logo from "../../logo.svg";
import { Link } from "react-router-dom";
import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import "./styles.scss";

export const Header = ({ logout }) => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <Link to="/" className="menu-element">
      Home
    </Link>
    <Link to="/entries" className="menu-element">
      Entries
    </Link>
    <div className="logout-container">
      <ExitToAppIcon onClick={logout} />
    </div>
  </header>
);
