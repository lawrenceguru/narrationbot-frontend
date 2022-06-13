import React, { useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/antd.css';
import "./App.css";

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes"

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"

import { history } from './helpers/history';

//layouts
import AuthLayout from './components/Layout/AuthLayout'
import DashboardLayout from './components/Layout/DashboardLayout'
import TreeViewLayout from './components/Layout/TreeViewLayout'


import UnAuthLayout from './components/Layout/UnAuthLayout'
import LoginLayout from './components/Layout/LoginLayout'
import RegisterLayout from './components/Layout/RegisterLayout'

const App = () => {
  const getLayout = _path => {
    let layoutCls
    switch (_path) {
      case "/login":
        layoutCls = LoginLayout
        break
      case "/register":
        layoutCls = RegisterLayout
        break
      case "/sendEmail":
        layoutCls = LoginLayout
        break
      case "/change-pass/:token":
        layoutCls = LoginLayout
        break
      case "/verify-email/:token":
        layoutCls = LoginLayout
        break
      default:
        layoutCls = UnAuthLayout
        break
    }
    return layoutCls
  }
  const getAuthLayout = _path => {
    let layoutCls
    switch (_path) {
      case "/dashboard":
        layoutCls = DashboardLayout
        break
      case "/subscription":
        layoutCls = DashboardLayout
        break
      case "/user-support":
        layoutCls = DashboardLayout
        break
      case "/narrate":
        layoutCls = TreeViewLayout
        break
      case "/my-files":
        layoutCls = TreeViewLayout
        break
      default:
        layoutCls = AuthLayout
        break
    }
    return layoutCls
  }
  return (
    <Router history={history}>
      <Switch>
        {authRoutes.map((route, idx) => (
          <Authmiddleware
            path={route.path}
            layout={getLayout(route.path)}
            component={route.component}
            key={idx}
            isAuthProtected={false}
            exact
          />
        ))}
        {userRoutes.map((route, idx) => (
          <Authmiddleware
            path={route.path}
            layout={getAuthLayout(route.path)}
            component={route.component}
            key={idx}
            isAuthProtected={true}
            exact
          />
        ))}
      </Switch>
    </Router>
  );
}

export default App