import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

import "./styles.scss";
import { bindActionCreators } from "redux";
import { login } from "../../actions/auth";
import {withRouter} from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = async () => {
    const { login } = this.props;
    const { email, password } = this.state;
    try {
      await login({
        email,
        password
      });
      this.props.history.push('/home');
    } catch (error) {
      console.log(error.message);
    }
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

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ login }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
