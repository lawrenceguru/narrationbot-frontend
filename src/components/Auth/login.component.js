import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { login } from "../../actions/auth";
import './styles.css'

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(login(this.state.username, this.state.password))
        // .then((data) => {
        //   console.log(data)
        //   history.push("/profile");
        //   // window.location.reload();
        // })
        // .catch(() => {
          this.setState({
            loading: false
          });
        // });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { isLoggedIn, message } = this.props;
    console.log(message)
    // if (isLoggedIn) {
    //   return <Redirect to="/profile" />;
    // }

    return (
      <div id="login">
        <div class='flexContent'>
          <section>
            <Form
              onSubmit={this.handleLogin}
              ref={(c) => {
                this.form = c;
              }}
            >

              <div className="form-group">
                Glad to see you again
              </div>
              <div className="form-group">
                {/* <label htmlFor="username">Email</label> */}
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  validations={[required]}
                  placeholder='Email'
                />
              </div>

              <div className="form-group">
                {/* <label htmlFor="password">Password</label> */}
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required]}
                  placeholder='Password'
                />
              </div>

              <div className="form-group forgot_password">
                <Link to={"/sendEmail"}>Forgot password</Link>
              </div>

              <div className="form-group">
                <button
                  className="defaultBtn"
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>

              {/* {message && message.split('Login: ').length > 1 && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )} */}

              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
              <div className="form-group">
                I don’t have an account?
                <Link to={"/register"}> Sign Up</Link>
              </div>
            </Form>
          </section>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Login);
