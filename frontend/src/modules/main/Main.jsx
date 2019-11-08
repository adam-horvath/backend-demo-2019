import React, { Component, Fragment } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import Home from "../home/Home";
import Login from "../login/Login";
import { Header } from "../header/Header";
import { API_TOKEN } from "../../constants/Contants";
import Entries from "../entries/Entries";

class Main extends Component {
  logout = () => {
    localStorage.removeItem(API_TOKEN);
    this.props.history.push('/login');
  };

  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    );

    const token = localStorage.getItem("demo-token");
    if (token && token !== "undefined" && token !== "null") {
      routes = (
        <Fragment>
          <Header logout={this.logout} />
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/entries" component={Entries} />
            <Redirect to="/home" />
          </Switch>
        </Fragment>
      );
    }
    return <div>{routes}</div>;
  }
}

export default withRouter(Main);
