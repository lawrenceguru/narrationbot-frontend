import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import LoginHeader from './Header/LoginHeader'
import login_bg from '../../assets/image/login_bg.png'

const AuthLayout = ({ children }) => {
  return (
    <React.Fragment>
      <div
        style={{ height: '100vh', background: `url(${login_bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
      >
        <LoginHeader />
        {children}
      </div>
    </React.Fragment>
  );
}

export default AuthLayout