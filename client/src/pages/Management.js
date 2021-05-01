import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import { render } from "react-dom";
import ACStatistics from "../components/Management/ACStatistics";
import Input from "react-bootstrap/InputGroup";
import Nav from "react-bootstrap/Nav";
import ApprovedUsers from "../components/Management/ApprovedUsers";
const Management = () => {
  const [contentType, setContentType] = useState("acstat");

  const handleClick = (e) => {
    setContentType(e.target.id);
  };

  return (
    <Container fluid style={{ height: "100% !important" }}>
      <Row style={{ height: "100% !important", backgroundColor: "white" }}>
        <Col
          lg={2}
          style={{ height: "100% !important", backgroundColor: "#fafafa" }}
        >
          {/* <ListGroup variant="flush">
            <ListGroup.Item id="acstat" action onClick={handleClick}>
              AC Statistics
            </ListGroup.Item>
            <ListGroup.Item id="aprvedusers" action onClick={handleClick}>
              Approved Users
            </ListGroup.Item>
          </ListGroup> */}

          <Nav
            defaultActiveKey="acstat"
            className="flex-column"
            onSelect={(e) => {
              setContentType(e);
            }}
          >
            <Nav.Link eventKey="acstat">AC Statistics</Nav.Link>
            <Nav.Link eventKey="users">Approved Users</Nav.Link>
            <Nav.Link eventKey="notyetset" disabled>
              Coming Soon
            </Nav.Link>
            <Nav.Link eventKey="disabled" disabled>
              Coming Soon
            </Nav.Link>
          </Nav>
        </Col>
        <Col sm={10}>
          {contentType === "acstat" ? <ACStatistics /> : ""}
          {contentType === "users" ? <ApprovedUsers /> : ""}
        </Col>
      </Row>
    </Container>
  );
};

export default Management;
