import React, { useState, useEffect } from "react";
import SignInTemplate from "../components/SignInTemplate";
import axios from "axios";
import { UncontrolledCollapse } from "reactstrap";
const Login = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  // 통신 메서드
  function searchApi() {
    const url = "/api/users/session_check";
    axios
      .get(url)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log("실패");
      });
  }

  useEffect(() => {
    searchApi();
    console.log("searchapi");
  }, []);
  return <SignInTemplate />;
};

export default Login;
