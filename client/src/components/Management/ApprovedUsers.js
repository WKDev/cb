import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Chart from "react-apexcharts";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { formatDiagnosticsWithColorAndContext } from "typescript";
import ButtonGroup from "react-bootstrap/ButtonGroup";
function UserData({ data }) {
  return (
    <Row>
      <Col sm={3}>
        <span>{typeof data.valid_until}</span>
      </Col>
      <Col sm={3}>
        <span>{data.phone}</span>
      </Col>
      <Col sm={2}>
        <span>{data.purpose}</span>
      </Col>
      <Col sm={2}>
        <span>{data.access_level}</span>
      </Col>
      <Col sm={2}>
        <span>{data.memo}</span>
      </Col>
    </Row>
  );
}

const ApprovedUsers = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    userApi("fetch");
  }, []);

  // 유저 데이터 관련 함수
  function userApi(type) {
    setUserData([]);
    if (type === "fetch") {
      fetch("/api/iot/fetchdata/approvedusers")
        .then((res) => res.json())
        .then((res) => {
          if (res !== null) {
            setUserData(
              Object.keys(res).map((v) => {
                return res[v];
              })
            );

            console.log("test", userData);
          }
        });
    }
    if (type === "update") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone,
          valid_until:
            +new Date() + 1000 * 60 * 60 * validSelector(validUntilMessage),
          purpose: visitPurpose,
          access_level: accessLevel,
          memo: userMemo,
        }),
      };
      console.log("fetching users data..");

      fetch("/api/iot/update/approvedusers", requestOptions)
        .then((res) => res.json())
        .then((res) => {
          console.log("successfully updated user!");
        });
    }
  }
  const [isModalOpen, setIsModalOpen] = useState(false); // 유저 데이터 추가하는 모달 열기 / 닫기
  const [rangeValue, setRangeValue] = useState(0); // valid 기간 지정하는 슬라이드바
  const [validUntilMessage, setValidUntilMessage] = useState(""); // valid 기간 ui 표시
  const [phone, setPhone] = useState(""); // 전화번호 필드
  const [userMemo, setUserMemo] = useState(""); // 메모 필드
  const [accessLevel, setAccessLevel] = useState(""); // 전화번호 필드

  const [showAlert, setShowAlert] = useState(false);
  const [visitPurpose, setVisitPurpose] = useState("");
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const validUntil = [
    "10 Minutes",
    "In an hour",
    "4 Hours",
    "6 Hours",
    "24 Hours",
    "Week",
    "Month",
    "Forever",
  ];
  const vp = ["inout", "tap", "electricity", "delivery", "asaguest"];
  const ac = ["guest", "checker", "owner"];

  function validSelector(message) {
    var validDate = 999;

    if (message === "10 Minutes") validDate = 10;
    if (message === "In an hour") validDate = 1;
    if (message === "4 Hours") validDate = 4;
    if (message === "6 Hours") validDate = 6;
    if (message === "24 Hours") validDate = 24;
    if (message === "Week") validDate = 168;
    if (message === "Month") validDate = 720;
    if (message === "Forever") validDate = "600000";

    return validDate;
  }
  const handleOnChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleRangeChange = (e) => {
    setRangeValue(e.target.value);
    setValidUntilMessage(validUntil[e.target.value]);
    setShowAlert(true);
  };

  const handleVisitPurpose = (e) => {
    setVisitPurpose(e.target.value);
  };
  const handleAccessLevel = (e) => {
    setAccessLevel(e.target.value);
  };
  const handleUserMemo = (e) => {
    setUserMemo(e.target.value);
  };
  const handleModalApply = () => {
    // 추가버튼 누를 때 동작
    userApi("update");
    // 여기에 컴포넌트 재렌더링 시켜서 완료된 걸 시각화 해야함
    toggleModal();
    userApi("fetch");
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <Modal show={isModalOpen} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Approved User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="please input phone number to approve"
              value={phone}
              onChange={handleOnChangePhone}
            />
          </Form.Group>
          <Form>
            <Form.Group controlId="formBasicRange">
              <Form.Label>
                How long will you give authority to this user? :
              </Form.Label>
              <Form.Control
                type="range"
                value={rangeValue}
                min="0"
                max={validUntil.length - 1}
                onChange={handleRangeChange}
                style={{ width: "100%" }}
              />
              <Alert variant="primary" show={showAlert}>
                {validUntilMessage}
              </Alert>{" "}
            </Form.Group>
          </Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Why this user have to access here?</Form.Label>
            <Form.Control
              as="select"
              value={visitPurpose}
              onChange={handleVisitPurpose}
            >
              {vp.map((n) => {
                return <option>{n}</option>;
              })}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>
              How much permissions you will grant to this user?
            </Form.Label>
            <Form.Control
              as="select"
              value={accessLevel}
              onChange={handleAccessLevel}
            >
              {ac.map((n) => {
                return <option>{n}</option>;
              })}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Describe exactly who this user is.</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={userMemo}
              onChange={handleUserMemo}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalApply}>
            Add User as Approved
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <Row></Row>
        <Row>
          <Col md={7}>
            <h3>Approved Users Management</h3>
          </Col>
          <Col md={1}></Col>
          <Col md={1}>
            <ButtonGroup aria-label="Basic example">
              <Button variant="danger">-</Button>
              <Button variant="outline-dark" onClick={toggleModal}>
                +
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <b>Valid</b>
          </Col>
          <Col sm={2}>
            <b>Phone </b>
          </Col>
          <Col sm={2}>
            <b>Purpose</b>
          </Col>
          <Col sm={2}>
            <b>AccessLevel</b>
          </Col>

          <Col sm={2}>
            <b>Memo</b>
          </Col>
        </Row>
        {userData.map((res) => {
          return <UserData data={res} key={res.phone} />;
        })}
      </Container>
    </div>
  );
};

export default ApprovedUsers;
