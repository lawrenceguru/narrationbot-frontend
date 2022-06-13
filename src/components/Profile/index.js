import React, { useState } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { connect } from "react-redux";
import { reLogin } from "../../actions/auth";
import TableCustom from "./TableCustom"
import BuyComponent from "./BuyComponent"

import { Tabs, Alert, Row, Col } from 'antd';
const { TabPane } = Tabs;
const Profile = ({ dispatch, history, message }) => {
  const [activeTab, setActiveTab] = useState('1')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onChangeUsername = (e) => {
    setUsername((prev) => prev = e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword((prev) => prev = e.target.value)
  }

  const onChangeRePassword = (e) => {
    setRePassword((prev) => prev = e.target.value)
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading((prev) => prev = true)

    this.form.validateAll();


    if (this.checkBtn.context._errors.length === 0) {
      dispatch(reLogin(username, password))
      setLoading((prev) => prev = false)
    } else {
      setLoading((prev) => prev = false)
    }
  }
  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  }
  // const toggle = (tab) => {
  //   if (activeTab !== tab) {
  //     setActiveTab((prev) => prev = tab)
  //   }
  // }

  const callback = (key) => {
    console.log(key);
  }
  
  // render() {
  return (
    <div>
      <Tabs defaultActiveKey="2" onChange={callback}>
        <TabPane tab="History" key="1">
          <h4>Narrate log lists</h4>
          <TableCustom />
        </TabPane>
        <TabPane tab="Imported Balance" key="2">
          <BuyComponent />
        </TabPane>
        <TabPane tab="My Profile" key="3">
          <Row>
            <Col span={4}></Col>
            <Col sm={16}>
              <h4>Change my profile</h4>
              <Form
                onSubmit={(e) => handleLogin(e)}
              >
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={(e) => onChangeUsername(e)}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(e) => onChangePassword(e)}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="repassword">Check Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="repassword"
                    value={rePassword}
                    onChange={(e) => onChangeRePassword(e)}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <button
                    className="btn btn-primary btn-block"
                    disabled={loading}
                    type='button'
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Change</span>
                  </button>
                </div>

                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
              </Form>
            </Col>
            <Col span={4}></Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
}


function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Profile);