import "./Routes.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Switch, Redirect, Route, Router } from "react-router-dom";
import { Dashboard, Login, Management } from "../pages";
import Mainpage from "../pages/Mainpage";
import AuthRoute from "./AuthRoute";

const App = () => {
  //어느 세션으로 보낼 지 선택

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [accountInfo, setAccountInfo] = useState("");
  async function sessionCheckApi() {
    const url = "/api/users/session_check";
    await axios
      .get(url)
      .then(function (res) {
        // console.log(res.data);
        if (res.data.code === "200") {
          setIsAuthorized(true);
          setAccountInfo(res.data.session);
          // console.log(res.data);
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

  return (
    <div style={{ height: "100%" }}>
      {/* {isAuthorized ? <Redirect to="/dashboard" /> : <Redirect to="/login" />} */}
      {/* <Switch> */}
      <Route exact path="/dashboard">
        <Mainpage pageType="dashboard" accountInfo={accountInfo} />
      </Route>
      <Route exact path="/mgmt">
        <Mainpage pageType="mgmt" accountInfo={accountInfo} />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/about">
        <Mainpage pageType="about" accountInfo={accountInfo} />
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
