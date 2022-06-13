import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import Header from './Header'
import Footer from './Footer'

const AuthLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {/* <div className="container mt-3"> */}
        {children}
      {/* </div> */}
      <Footer />
    </React.Fragment>
  );
}

export default AuthLayout