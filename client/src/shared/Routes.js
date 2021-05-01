import "./Routes.css";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Switch, Redirect, Route, Router } from "react-router-dom";
import { Dashboard, Login, Management } from "../pages";
import Mainpage from "../pages/Mainpage";
import AuthRoute from "./AuthRoute";

import { useHistory } from "react-router-dom";

const App = () => {
  //어느 세션으로 보낼 지 선택

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [accountInfo, setAccountInfo] = useState("");
  const [expire, setExpire] = useState(600);
  function sessionCheckApi() {
    const url = "/api/users/session_check";
    axios
      .get(url)
      .then(function (res) {
        // console.log(res.data);
        if (res.data.code === "200") {
          var currDate = +new Date();
          setIsAuthorized(true);
          setAccountInfo(res.data.session);
          setExpire((res.data.expires - currDate) / 1000);
          console.log(res.data);
        } else {
          setIsAuthorized(false);
        }
      })
      .catch(function (error) {
        console.log("세션 존재하지 않음");
      });
  }

  useEffect(() => {
    sessionCheckApi();
  }, []);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    // 작동안함
    if (parseInt(expire) === 0) {
      handleLogout();
    }
    setExpire(expire - 1);
  }, 1000);

  const history = useHistory();

  const handleLogout = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: "logout",
      }),
    };
    fetch("/api/users/logout", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log("logout_success");
        setExpire(99999);
        history.push("/login");
      });
  };

  return (
    <div style={{ height: "100%" }}>
      {/* {isAuthorized ? <Redirect to="/dashboard" /> : <Redirect to="/login" />} */}
      {/* <Switch> */}
      {expire}
      <Route exact path="/dashboard">
        <Mainpage
          pageType="dashboard"
          accountInfo={accountInfo}
          expire={expire}
        />
      </Route>
      <Route exact path="/mgmt">
        <Mainpage pageType="mgmt" accountInfo={accountInfo} expire={expire} />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/about">
        <Mainpage pageType="about" accountInfo={accountInfo} expire={expire} />
      </Route>
      <Route exact path="/">
        {isAuthorized ? <Redirect to="/dashboard" /> : <Login />}
      </Route>
      {/* <Route path="/management">
          <Management />
        </Route> */}
      {/* </Switch> */}
      {/* <Route exact path="/login" component={Login} /> */}
      {/* <Route exact path="/" component={<p>test</p>} /> */}
    </div>
  );

  // return (
  //   <Switch>
  //     <AuthRoute
  //       authenticated={isAuthorized}
  //       path="/dashboard"
  //       render={(props) => <Mainpage pageType="dashboard" />}
  //     />
  //   </Switch>
  // );
};

export default App;
