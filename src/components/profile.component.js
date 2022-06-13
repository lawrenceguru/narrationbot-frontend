import React, { Component, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import UserService from "../services/user.service";

const Profile = ({ user: currentUser }) => {
    
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container">
        <p>
          <strong>Username:</strong> {currentUser.username}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <div className='row' style={{ marginTop: '20px' }}>
          <div className='col-3'>
            <div>
              <button type="button" className="btn btn-primary btn-lg btn-block">Paypal</button>
            </div>
          </div>
          <div className='col-3'>
            <div>
              <button type="button" className="btn btn-primary btn-lg btn-block">Payoneer</button>
            </div>
          </div>
        </div>
      </div>
    );
  // }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);