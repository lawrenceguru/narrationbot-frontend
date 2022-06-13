import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import { register } from "../../actions/auth";
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

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.repassword = this.repassword.bind(this);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      successful: false,
    };
  }

  onChangeFirstname(e) {
    this.setState({
      firstname: e.target.value,
    });
  }
  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          register({firstname: this.state.firstname, lastname: this.state.lastname, email: this.state.email, password: this.state.password})
        )
        .then(() => {
          this.setState({
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }
  
  repassword(value){
    if (value !== this.state.password) {
      return (
        <div className="alert alert-danger" role="alert">
          Please check your password again.
        </div>
      );
    }
  }
  render() {
    const { message } = this.props;
    return (
      <div id="register">
        <div className='row'>
          <div className='col-md-6' style={{ display: 'flex', alignItems: 'center' }}>
            <aside>
              <header>
                Enjoy your <span>first 1,000 words</span> on us when you sign up.
              </header>
              <footer>
                <div>
                  
                </div>
                <ul>
                    <li>Effortlessly narrate your text using royalty fee voices</li>
                    <li>Access your files from anywhere using cloud storage</li>
                    <li>Select from dozens of voices and many languages</li>
                    <li>Straight forward, easy to understand pricing</li>
                </ul>
              </footer>
            </aside>
          </div>
          <div className='col-md-6' style={{ display: 'flex', alignItems: 'center' }}>
            <section>
              <Form
                onSubmit={this.handleRegister}
                ref={(c) => {
                  this.form = c;
                }}
              >
                <div className="form-group">
                  Sign up to claim your first 1,000 words.
                </div>
                {!this.state.successful && (
                  <>
                    <div className="form-group">
                      <Input
                        type="text"
                        className="form-control"
                        name="firstname"
                        value={this.state.firstname}
                        onChange={this.onChangeFirstname}
                        validations={[required]}
                        placeholder='First name'
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        type="text"
                        className="form-control"
                        name="lastname"
                        value={this.state.lastname}
                        onChange={this.onChangeLastname}
                        validations={[required]}
                        placeholder='Last name'
                      />
                    </div>

                    <div className="form-group">
                      <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        validations={[required, email]}
                        placeholder='Email'
                      />
                    </div>

                    <div className="form-group">
                      <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[required, vpassword]}
                        placeholder='Password'
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        type="password"
                        className="form-control"
                        name="repassword"
                        validations={[required, this.repassword]}
                        placeholder='Check password'
                      />
                    </div>
                    <div className="form-group">
                      <button className="defaultBtn">Sign Up</button>
                    </div>
                  </>
                )}

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
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(Register);
