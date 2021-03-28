import React from 'react'
import logo_a from '../assets/cranberry-logo.png'
import Navbar from 'react-bootstrap/Navbar'
import '../assets/bootstrap.min.css'
import './NavigationBar.css'
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
            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src={logo_a}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Cranberry
            </Navbar.Brand>
            <Navbar.Text>Dashboard </Navbar.Text>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    {/* Signed in as: <a href="#login">{props.phone}</a> */}
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar
