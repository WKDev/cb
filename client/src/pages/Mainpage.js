import React, { useState, useRef, useEffect } from "react";
import NavigationBar from "../components/bar/NavigationBar";
import StatusBar from "../components/bar/StatusBar";
import { useHistory } from "react-router-dom";
import Dashboard from "./Dashboard";
import Management from "./Management";
import About from "./About";
import Toast from "react-bootstrap/Toast";

// import useNetwork from "./useNetwork";
const Mainpage = (props) => {
  const history = useHistory();

  const [ep, setEp] = useState(600);

  const handleLogout = () => {
    console.log("pageType :" + props.pageType);
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
        history.push("/login");
      });
  };

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
    parseInt(ep) === 0 && handleLogout();

    setEp(props.expire - 1);
  }, 1000);

  useEffect(() => {
    return {};
  }, [ep]);

  // const handleNetworkChange = (online) => {
  //   console.log(online ? "We just went online" : "We are offline");
  // };
  // const onLine = useNetwork(handleNetworkChange);

  return (
    <div style={{ height: "100%" }}>
      <NavigationBar phone={"phone_not_yet_set"} />
      <StatusBar
        phone={props.accountInfo}
        expire={props.expire}
        logout={handleLogout}
      />
      {props.pageType === "dashboard" && <Dashboard />}
      {props.pageType === "mgmt" && <Management />}
      {props.pageType === "about" && <About />}
      {/* 
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "relative",
          minHeight: "100px",
        }}
      >
        <Toast
          style={{
            position: "absolute",
            top: "-200px",
            right: "15px",
          }}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Bootstrap</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
      </div> */}
    </div>
  );
};

export default Mainpage;
