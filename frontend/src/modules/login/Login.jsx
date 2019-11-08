import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./styles.scss";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = () => {
    console.log("hello");
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="login-container">
        <div className="content">
          <h3>Please login</h3>
          <div className="email-container">
            <TextField
              name="email"
              label="Email"
              autoComplete="off"
              value={email}
              onChange={this.handleChange}
              fullWidth
            />
          </div>
          <br />
          <div className="password-container">
            <TextField
              name="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={this.handleChange}
              fullWidth
            />
          </div>
          <div className="button-container">
            <Button
              variant="contained"
              color="primary"
              onClick={this.login}
              fullWidth
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
