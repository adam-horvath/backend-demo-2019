import React, { Component } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import Home from "../home/Home";
import Login from "../login/Login";
import { Header } from "../header/Header";

class Main extends Component {
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
        <React.Fragment>
          <Header />
          <Route exact path="/" component={Home} />
        </React.Fragment>
      );
    }
    return <div>{routes}</div>;
  }
}

export default withRouter(Main);
