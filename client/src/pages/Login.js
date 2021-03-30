import React, { useState, useEffect } from "react";
import SignInTemplate from "../components/SignInTemplate";

const Login = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        request: "session",
      }),
    };

    fetch("/api/users/session_check", requestOptions)
      .then((res) => res.json())
      .then((users) => {
        console.log("in app_sessCheck");
        console.log(users);
        setIsAuthorized(Boolean(parseInt(users.isAuthorized)));
        console.log(isAuthorized);
      });
  });

  return <SignInTemplate />;
};

export default Login;
