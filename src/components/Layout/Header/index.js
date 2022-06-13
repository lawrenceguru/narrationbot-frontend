import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../actions/auth";
import { clearMessage } from "../../../actions/message";
import './style.css'
import logo from "../../../assets/image/logo.png"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const HeaderBar = ({ user, dispatch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(false)

  const unAuthUrl = [
    {
      link: '/home',
      title: 'Home'
    },
    {
      link: '/features',
      title: 'Features'
    },
    {
      link: '/pricing',
      title: 'Pricing'
    },
    {
      link: '/support',
      title: 'Support'
    }
  ]
  const AuthUrl = [
    // {
    //   link: '/pre-dashboard',
    //   title: 'PreDashboard'
    // },
    {
      link: '/dashboard',
      title: 'Dashboard'
    },
    {
      link: '/narrate',
      title: 'Narrate'
    },
    {
      link: '/my-files',
      title: 'My Files'
    },
    {
      link: '/user-support',
      title: 'Support'
    }
  ]
  const checkActiveLink = _link => {
    return window.location.pathname.includes(_link)
  }
  const toggle = () => {
    setIsOpen((prev) => !prev)
  }
  useEffect(() => {
    dispatch(clearMessage()); // clear message when changing location
  }, [])
  useEffect(() => {
    if (user) {
      setCurrentUser(user)
    }
  }, [user])

  const logOut = () => {
    dispatch(logout());
    setCurrentUser()
  }
    return (
        <div>
          <Navbar color="" light expand="md">
            <NavbarBrand>
              <Link to={"/"} className="navbar-brand">
                <img src={logo} width={292} height={39} alt='' />
              </Link>
            </NavbarBrand>
            <NavbarToggler onClick={() => toggle()} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" style={{ width: '100%', justifyContent: 'center' }} navbar>
                {currentUser ? (
                  AuthUrl.map((res, index) => (
                    <NavItem key={index}>
                      {checkActiveLink(res.link) ? (
                        <Link className="nav-link active" to={res.link}>{res.title}</Link>
                      ): (
                        <Link className="nav-link" to={res.link}>{res.title}</Link>
                      )}
                    </NavItem>
                  ))
                ) : (
                  unAuthUrl.map((res, index) => (
                    <NavItem key={index}>
                      {checkActiveLink(res.link) ? (
                        <Link className="nav-link active" to={res.link}>{res.title}</Link>
                      ): (
                        <Link className="nav-link" to={res.link}>{res.title}</Link>
                      )}
                    </NavItem>
                  ))
                )}
              </Nav>
              <Nav className="ml-auto" navbar>
                {currentUser ? (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      <span className='avatarName'>
                        <span>Credit Balance: </span>
                        {currentUser?.balence?.toLocaleString()}
                      </span>
                      <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-logo"
                      />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <Link className="nav-link" to={"/profile"}>Profile</Link>
                      </DropdownItem>
                      {/* <DropdownItem>
                        Option 2
                      </DropdownItem> */}
                      <DropdownItem divider />
                      <DropdownItem>
                        <Link to={"/"} className="nav-link" onClick={() => logOut()}>
                          Log out
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : (
                  <>
                    <NavItem>
                      <Link className="nav-link" to={"/login"}>Login</Link>
                    </NavItem>
                    <NavItem>
                      <Link className="nav-link" id='signUpBtn' to={"/register"}>Sign<span>Up</span></Link>
                    </NavItem>
                  </>
                )}
              </Nav>
            </Collapse>
          </Navbar>
        </div>
    );
}


function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(HeaderBar);