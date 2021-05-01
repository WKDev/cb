import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "./StatusBar.css";

const StatusBar = (props) => {
  return (
    <Navbar bg="light" bsPrefix="stat-bar">
      <Navbar.Text>{props.phone}</Navbar.Text>
      <Navbar.Text>
        Expire : {parseInt(props.expire / 60)} :{parseInt(props.expire % 60)}
      </Navbar.Text>

      <Button size="sm" variant="danger" onClick={props.logout}>
        logout
      </Button>
    </Navbar>
  );
};

export default StatusBar;
