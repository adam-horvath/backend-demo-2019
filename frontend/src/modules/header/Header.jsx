import logo from "../../logo.svg";
import { Link } from "react-router-dom";
import React from "react";
import './styles.scss';

export const Header = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <Link to="/" className="menu-element">
      Home
    </Link>
  </header>
);
