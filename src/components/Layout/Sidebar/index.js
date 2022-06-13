import React, { useState, useEffect } from "react";
import { NavItem, NavLink, Nav } from "reactstrap";
import { connect } from "react-redux";
import classNames from "classnames";
import { Link } from "react-router-dom";
import './styles.css'
import { ReactComponent as Icon_dashboard } from '../../../assets/image/sidebar_icon1.svg'
import { ReactComponent as Icon_narrate } from '../../../assets/image/sidebar_icon2.svg'
import { ReactComponent as Icon_myfiles } from '../../../assets/image/sidebar_icon3.svg'
import { ReactComponent as Icon_support } from '../../../assets/image/sidebar_icon4.svg'
import { ReactComponent as Icon_subscription } from '../../../assets/image/sidebar_icon5.svg'

const SideBar = ({ isOpen, toggle, user }) => {
  const [currentUser, setCurrentUser] = useState()
  useEffect(() => {
    if (user) {
      setCurrentUser(user)
    }
  }, [user])

  const checkActiveLink = _link => {
    return window.location.pathname.includes(_link)
  }
  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        {/* <span color="info" onClick={toggle} style={{ color: "#fff" }}>
          show
        </span>
        <h3>Bootstrap Sidebar</h3> */}
        <section>
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-logo"
          />
          <footer>
            <div>{currentUser?.firstname} {currentUser?.lastname}</div>
            <div>{currentUser?.email}</div>
          </footer>
        </section>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <NavItem>
            <NavLink tag={Link} to={"/dashboard"} className={checkActiveLink('/dashboard') && 'active'}>
              <Icon_dashboard />
              <span  className="ml-2">Dashboard</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/narrate"} className={checkActiveLink('/narrate') ? 'active' : ''}>
              <Icon_narrate />
              <span className="ml-2">Narrate</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/my-files"} className={checkActiveLink('/my-files') ? 'active' : ''}>
              <Icon_myfiles />
              <span className="ml-2">My Files</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/user-support"} className={checkActiveLink('/user-support') ? 'active' : ''}>
              <Icon_support />
              <span className="ml-2">Support</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/subscription"} className={checkActiveLink('/subscription') ? 'active' : ''}>
              <Icon_subscription />
              <span className="ml-2">Subscription & Credit</span>
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(SideBar);