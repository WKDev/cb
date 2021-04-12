import "./Routes.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Switch, Redirect, Route } from "react-router-dom";
import { Dashboard, Login } from "../pages";

const App = () => {
  //어느 세션으로 보낼 지 선택

  const [isAuthorized, setIsAuthorized] = useState(false);

  async function searchApi() {
    const url = "/api/users/session_check";
    await axios
      .get(url)
      .then(function (res) {
        console.log(res.data);
        res.data.code === "200"
          ? setIsAuthorized(true)
          : setIsAuthorized(false);
      })
      .catch(function (error) {
        console.log("세션 존재하지 않음");
      });
  }

  useEffect(() => {
    searchApi();
  }, []);

  return (
    <div>
      {isAuthorized ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>

        <Route path="/">
          <Login />
        </Route>
      </Switch>
      {/* <Route exact path="/login" component={Login} /> */}
      {/* <Route exact path="/" component={<p>test</p>} /> */}
    </div>
  );
};

export default App;
