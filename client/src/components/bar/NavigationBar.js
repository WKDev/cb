import React from "react";
import logo_a from "../assets/cranberry-logo.png";
import Navbar from "react-bootstrap/Navbar";
import NavLink from "react-bootstrap/NavLink";
import NavItem from "react-bootstrap/NavItem";
import "../assets/bootstrap.min.css";
import "./NavigationBar.css";
// import {
//     Collapse,
//     Navbar,
//     NavbarToggler,
//     NavbarBrand,
//     Nav,
//     NavItem,
//     NavLink,
//     UncontrolledDropdown,
//     DropdownToggle,
//     DropdownMenu,
//     DropdownItem,
//     NavbarText,
// } from 'reactstrap'

const NavigationBar = (props) => {
  return (
    <Navbar expand="sm" bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <img
          alt=""
          src={logo_a}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        Cranberry
      </Navbar.Brand>

      <NavItem>
        <NavLink bsprefix="navlink" href="/dashboard/">
          Dashboard
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/mgmt/">Management</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/about/">About</NavLink>
      </NavItem>

      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          {/* Signed in as: <a href="#login">{props.phone}</a> */}
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
