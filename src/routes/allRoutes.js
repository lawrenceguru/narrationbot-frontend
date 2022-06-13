import React from "react"
import { Redirect } from "react-router-dom"

//authURL
import PreDashboard from "../components/User/PreDashboard"
import Dashboard from "../components/User/Dashboard"
import Narrate from "../components/User/Narrate"
import MyFiles from "../components/User/MyFiles"
import UserSupport from "../components/User/UserSupport"
import Subscription from "../components/User/Subscription"
import xx from "../components/home.component"
// import Account from "../components/profile.component"
// import Profile from "../components/Profile"

//UnAuthURL
import Login from "../components/Auth/login.component"
import Register from "../components/Auth/register.component"
import VerifyEmail from '../components/Auth/verify.component'
import SendEmail from '../components/Auth/forgotPassword'
import ChangePassword from '../components/Auth/changePassword'
import Home from "../components/Home"
import Features from "../components/Features"
import Pricing from "../components/Pricing"
import Support from "../components/Support"

const userRoutes = [

  //pre-dashboard
  { path: "/pre-dashboard", component: PreDashboard },

  //dashboard
  { path: "/dashboard", component: Dashboard },

  // //profile
  { path: "/narrate", component: Narrate },

  // //my-files
  { path: "/my-files", component: MyFiles },

  // //user-support
  { path: "/user-support", component: UserSupport },

  // //subscription
  { path: "/subscription", component: Subscription },
  { path: "/xx", component: xx },

  // this route should be at the end of all other routes
  // { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [
  //authencation page
  // { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/verify-email/:token", component: VerifyEmail },
  { path: "/register", component: Register },
  { path: "/sendEmail", component: SendEmail },
  { path: "/change-pass/:token", component: ChangePassword },

  { path: "/home", component: Home },
  { path: "/features", component: Features },
  { path: "/pricing", component: Pricing },
  { path: "/support", component: Support },
  { path: "/", exact: true, component: () => <Redirect to="/home" /> },
]

export { userRoutes, authRoutes }
