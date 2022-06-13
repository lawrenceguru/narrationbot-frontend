import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { clearMessage } from "../../../actions/message";
import './style.css'
import logo from "../../../assets/image/logo.png"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

const HeaderBar = ({ user, dispatch }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen((prev) => !prev)
  }
  useEffect(() => {
    dispatch(clearMessage()); // clear message when changing location
  }, [])
  useEffect(() => {
    if (user) {
      window.location.href = '/dashboard';
    }
  }, [])

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
              <Nav className="ml-auto" navbar>
                <>
                  <NavItem>
                    <Link className="nav-link" to={"/login"}>Login</Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" id='signUpBtn' to={"/register"}>Sign<span>Up</span></Link>
                  </NavItem>
                </>
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