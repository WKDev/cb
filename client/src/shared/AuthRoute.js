import { Route, Redirect } from "react-router";
import React, { useEffect, useState } from "react";

import axios from "axios";

//https://kimchanjung.github.io/programming/2020/06/24/react-router-private-router/

const AuthRoute = ({ component: Component, ...parentProps }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  async function sessionCheckApi() {
    const url = "/api/users/session_check";
    await axios
      .get(url)
      .then(function (res) {
        // console.log(res.data);
        res.data.code === "200"
          ? setIsAuthorized(true)
          : setIsAuthorized(false);

        console.log(res.data.code);
      })
      .catch(function (error) {
        console.log("세션 존재하지 않음");
      });
  }

  return (
    <Route
      {...parentProps}
      render={(props) =>
        sessionCheckApi() ? (
          <Component {...props} parentMenu={this.props.menu} />
        ) : (
          <Redirect to="/403" />
        )
      }
    />
  );
};

export default AuthRoute;
