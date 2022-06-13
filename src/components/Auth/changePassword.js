import React, { Component } from "react";
import { Redirect, useParams, useHistory, withRouter } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { changePassword } from "../../actions/auth";
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

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.changePassword = this.changePassword.bind(this);
    this.onChangeRePassword = this.onChangeRePassword.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      password: "",
      repassword: "",
      loading: false,
    };
  }

  onChangeRePassword(e) {
    this.setState({
      repassword: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  
  checkPaswordRequired = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
    
    if (value !== this.state.password) {
      return (
        <div className="alert alert-danger" role="alert">
          Check password!
        </div>
      );
    }
  };
  changePassword(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history, location } = this.props;
    const token = location.pathname.split('/change-pass/')[1]
    if (this.checkBtn.context._errors.length === 0) {
      dispatch(changePassword(this.state.password, token))
      this.setState({
        loading: false
      });
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
              onSubmit={this.changePassword}
              ref={(c) => {
                this.form = c;
              }}
            >
              <div className="form-group">
                Reset password
              </div>
              <div className="form-group">
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

              <div className="form-group">
                <Input
                  type="password"
                  className="form-control"
                  name="repassword"
                  value={this.state.repassword}
                  onChange={this.onChangeRePassword}
                  validations={[this.checkPaswordRequired]}
                  placeholder='Check password'
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
                  <span>Reset Password</span>
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

export default connect(mapStateToProps)(ChangePassword);
