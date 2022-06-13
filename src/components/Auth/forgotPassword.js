import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { sendEmail } from "../../actions/auth";
import { notification } from 'antd'
import './styles.css'

const openNotification = (val) => {
  notification.open({
    message: 'Notification Title',
    description:
      val,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};
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
    // this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      loading: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
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
      dispatch(sendEmail(this.state.username))
        .then((data) => {
          if (data.data.success) {
            openNotification(data.data.message)
          } else {
            openNotification(data.data.message)
            this.setState({
              loading: false
            });
          }
        })
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { isLoggedIn, message } = this.props;

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
                Forgot password
              </div>
              <div className="form-group">
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
                <button
                  className="defaultBtn"
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span> Send</span>
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
                I already have an account
                <Link to={"/login"}> Login</Link>
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
