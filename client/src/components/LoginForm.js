import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

import {
  Input,
  Alert,
  Collapse,
  FormGroup,
  Label,
  FormFeedback,
} from "reactstrap";
import "./LoginForm.css";
import "./assets/bootstrap.min.css";

// 210311 일단 기본 틀은 잡음
// 210312 해야할 일 : 가운데 정렬 + Collapse 적용
// 210313 한 일 : alert-input 연동 + alert에 collapse 적용했으나 미완, LoginForm 함수형으로 변경
// 210314 할 일 : alert에 collapse 적용했으나 미완, 로그인 조건문, 로그인 세션(관련 문서 찾아서 그냥 넣읍시다.)

// Immutable.js : 복잡한 setState 쓰고 하는 불편함을 해소해줌
// redux, ContextAPI : 깊은 단위의 자식 컴포넌트가 Root 통해서 번거롭게 통신하ㅣ는 걸 막아줌 // 이 단위 프로젝트에서는 필요 없을 것으로 보임.
// 1. redux가 뭐하는 놈인지, 로그인 구현, db 연동
// 2. roslibjs 통합
// 3. 페이지 관리
// 4. 카드 컴포넌트 생성
// 5. 메인페이지
// css 꾸미는 건 나중에 하고 일단 기능 구현만 바짝 하자

const LoginForm = (props) => {
  // oncreate : 버튼 클릭될때 실행될 함수
  // onChange 내용 변경시 실행되는 함수
  // onKeyPress 키 입력시 사용되는 함수, 나중에 enter 눌렸을 시 oncreate 한 것과 동일한 작업을 위해 사용함.

  // useEffect : 리액트 컴포넌트가 렌더링 될 때만다 특정 작업을 수행하도록 설정
  // -->componentDidMount + componentDidUpDate 합친 형태
  // https://velog.io/@velopert/react-hooks // 컴포넌트 언마운트 전, 업데이트 전에는 클린업 함수 반환해줘야 함

  // useEffect(() =>{
  //     // 마운트될 때만 실행됨. 컴포넌트 처을 나타날 때만 실행되고 그 뒤엔 실행되지 않음
  // },[]);

  // useEffect(() =>{
  //     // 두번째 파라미터로 전달되는 배열 안의 값이 바뀔 때 실행됨
  // },[data]);

  const [isOpen, setIsOpen] = useState(true); // 배열로 선언된 첫번째 인자는 state, 두번째는 그를 조작하는 함수
  const [alertOpen, setAlertOpen] = useState(false);
  const [alert_content, setAlertContent] = useState("");

  const [input_phone, setInputPhone] = useState("01047383672");
  const [input_code, setInputCode] = useState("");
  const [phoneFeedback, setPhoneFeedback] = useState("");
  const [visit_purpose, setVisitPurpose] = useState("tap");
  const [isValidInput, setIsValidInput] = useState(true);
  const [isValidSelect, setIsValidSelect] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const history = useHistory();

  //전화번호 input 폼 change 처리
  const handleChange = (e) => {
    setInputPhone(e.target.value);
    if (3 < e.target.value.length && e.target.value.length < 11) {
      if (e.target.value.slice(0, 3) !== "010") {
        setIsValidInput(false);
        setPhoneFeedback("010으로 시작하는 유효한 번호를 입력하세요");
      } else {
        setIsValidInput(false);
        setPhoneFeedback("휴대폰 번호를 입력해주세요");
      }
    } else {
      setIsValidInput(true);
    }
  };
  const onChangeAuth = (e) => {
    setInputCode(e.target.value);
  };

  const handleSelect = (e) => {
    console.log(e.target.value);
    setVisitPurpose(e.target.value);
  };

  const handleSubmit = (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: input_phone,
        purpose: visit_purpose,
      }),
    };

    if (input_phone.length < 11) {
      setIsValidInput(false);
    } else {
      setIsValidInput(true);

      if (visit_purpose === "def") {
        setIsValidSelect(false);
      } else {
        setIsValidSelect(true);

        fetch("/api/users/info_check", requestOptions)
          .then((res) => res.json())
          .then((users) => {
            setAlertContent(users.status);
            setAlertOpen(true);
            console.log(users);
            users.code === "202" && toggle();
          });
      }
    }
  };
  const handleAuth = (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: input_code,
        phone: input_phone,
        purpose: visit_purpose,
      }),
    };

    fetch("/users/code_check", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.code === "202") {
          history.push({
            pathname: "/dashboard",
          });
        }
      });
  };

  return (
    <div className="form-signin">
      <Collapse isOpen={alertOpen}>
        <Alert color="danger">{alert_content}</Alert>
      </Collapse>
      {/* 전화번호, 방문목적 input  */}
      <Collapse isOpen={isOpen}>
        <FormGroup>
          <Label for="exampleEmail">Phone Number</Label>
          <Input
            type="tel"
            value={input_phone}
            onChange={handleChange}
            invalid={!isValidInput}
            maxLength="11"
          />
          <FormFeedback>{phoneFeedback}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="exampleEmail">Visit Purpose</Label>
          <Input
            type="select"
            value={visit_purpose}
            onChange={handleSelect}
            name="visit_purpose"
            id="visit_purpose"
            className="form-select "
            placeholder="Visit Purpose"
            style={{ marginTop: 10 + "px" }}
            invalid={!isValidSelect}
          >
            <option value="def">방문목적을 선택해주세요</option>
            <option value="elec">전기 검침</option>
            <option value="tap">수도 검침</option>
            <option value="inout">단순출입</option>
            <option value="delivery">택배</option>
          </Input>
          <FormFeedback>방문 목적을 선택하세요</FormFeedback>
        </FormGroup>

        <Button color="info" className="create-button" onClick={handleSubmit}>
          인증번호 발송
        </Button>
      </Collapse>
      {/* 인증번호 input */}
      <Collapse isOpen={!isOpen}>
        <Input
          name="auth_code"
          type="number"
          value={input_code}
          onChange={onChangeAuth}
          placeholder="authcode"
          required
        />

        <Button color="info" className="create-button" onClick={handleAuth}>
          완료
        </Button>
      </Collapse>
    </div>
  );
};

export default LoginForm;
