import React, { useState, useEffect } from "react";
import Switch from "../elements/Switch";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import arrow_icon from "../assets/arrow_icon.svg";
import "./content.css";

function toBoolean(str) {
  var booldata = false;
  str === "true" && (booldata = true);

  return booldata;
}

const LightContent = (props) => {
  const [isOpen, setisOpen] = useState(false);
  const [light1, setLight1] = useState({ name: "light1", state: false });
  const [light2, setLight2] = useState({ name: "light2", state: false });

  useEffect(() => {
    fetch("/api/iot/fetchdata/light")
      .then((res) => res.json())
      .then((res) => {
        // console.log("fetched status :" + JSON.stringify(res));
        setLight1({ name: "light1", state: Boolean(res.light1.state) });
        setLight2({ name: "light2", state: Boolean(res.light2.state) });
      });

    return () => {}; // async하게 작동하는 걸 useeffect로 썼으면 cleanup 해줘야 한다. 그래야 언마운트 후에 코드가 돌아가는 걸 막는다.
    //https://dev.to/pallymore/clean-up-async-requests-in-useeffect-hooks-90h
  }, []);

  //범인 찾았다. .. handleToggle에서는 값에 본격적으로 업데이트 되지 않는듯 하다. 따라서 업데이트는 useEffect 단에서 해야겠다.

  const handleLight = (target) => {
    if (target.name === "light1") {
      setLight1({ name: "light1", state: !light1.state });
    }
    if (target.name === "light2") {
      setLight2({ name: "light2", state: !light2.state });
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: target.name,
        state: !target.state,
      }),
    };

    fetch("/api/iot/light", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
      });
  };

  const [arrowDir, setArrowDir] = useState("arrow-icon");

  const handleExpand = () => {
    setisOpen(!isOpen); // open collapse
    isOpen ? setArrowDir("arrow-icon-reversed") : setArrowDir("arrow-icon");
  };
  return (
    <div>
      <Switch
        id="light1"
        label="Living Room"
        isOn={light1.state}
        onColor="#EF476F"
        handleToggle={() => handleLight(light1)}
        timer={true}
      ></Switch>
      <Switch
        id="light2"
        label="Kitchen"
        isOn={light2.state}
        onColor="#EF476F"
        handleToggle={() => handleLight(light2)}
        timer={true}
      ></Switch>

      <Collapse in={isOpen}>
        <div>
          <Switch
            id="light2"
            label="Kitchen"
            isOn={light2}
            onColor="#EF476F"
            handleToggle={() => setLight2(!light2)}
            timer={false}
          ></Switch>
          <Switch
            id="light2"
            label="Kitchen"
            isOn={light2}
            onColor="#EF476F"
            handleToggle={() => setLight2(!light2)}
            timer={false}
          ></Switch>
          <Switch
            id="light2"
            label="Kitchen"
            isOn={light2}
            onColor="#EF476F"
            handleToggle={() => setLight2(!light2)}
            timer={false}
          ></Switch>
        </div>
      </Collapse>

      <Button
        variant="Light"
        size="lg"
        bsPrefix="collapse-expand-light"
        onClick={handleExpand}
      >
        <img className={arrowDir} src={arrow_icon} alt="" />
      </Button>
    </div>
  );
};

export default LightContent;
