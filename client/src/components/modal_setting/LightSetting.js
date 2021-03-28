import React, { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Collapse from "react-bootstrap/Collapse";
import Switch from "../elements/Switch";

import TimePicker from "react-time-picker";
import "./modal_setting.css";
const LightSetting = () => {
  const [light2, setLight2] = useState(false);
  const [radioValue, setRadioValue] = useState("");
  // const [open, setOpen] = useState(false)
  const [value, onChange] = useState("10:00");
  const radios = [
    { name: "ON", value: "1" },
    { name: "OFF", value: "2" },
    { name: "Manual", value: "3" },
    { name: "Timer", value: "4" },
  ];

  const handleRadioChange = (e) => {
    setRadioValue(e.currentTarget.value);
  };

  return (
    <div>
      <div className="mode-radio">
        <ButtonGroup toggle>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={handleRadioChange}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>
      <div>
        <Collapse in={radioValue === "1"}>
          <div>
            <hr class="solid" />

            <div id="collapse-text">Turns on whole light.</div>
          </div>
        </Collapse>
      </div>
      <div>
        {/* OFF */}
        <Collapse in={radioValue === "2"}>
          <div>
            <hr class="solid" />

            <div id="collapse-text">Turns off whole light.</div>
          </div>
        </Collapse>
      </div>
      <div>
        <Collapse in={radioValue === "3"}>
          <div>
            <div className="light-wrap">
              <Switch
                label="Living Room"
                isOn={light2}
                onColor="#EF476F"
                handleToggle={() => setLight2(!light2)}
                timer={false}
              ></Switch>
              <Switch
                label="Kitchen"
                isOn={light2}
                onColor="#EF476F"
                handleToggle={() => setLight2(!light2)}
                timer={false}
              ></Switch>
              <Switch
                label="Outside"
                isOn={light2}
                onColor="#EF476F"
                handleToggle={() => setLight2(!light2)}
                timer={false}
              ></Switch>
              <Switch
                label="Kitchen"
                isOn={light2}
                onColor="#EF476F"
                handleToggle={() => setLight2(!light2)}
                timer={false}
              ></Switch>
              <hr class="solid" />
              <div id="collapse-text">Control lights manually.</div>
            </div>
          </div>
        </Collapse>
      </div>
      <div>
        <Collapse in={radioValue === "4"}>
          <div>
            <div className="timer-wrap">
              <div className="time-picker-wrap">
                <div className="time-picker-label">
                  <div>From : </div>
                  <TimePicker onChange={onChange} value={value} />
                </div>
                <div className="time-picker-label">
                  <div>Until : </div>
                  <TimePicker onChange={onChange} value={value} />
                </div>
              </div>
              <hr class="solid" />

              <div id="collapse-text">Lights works at the set time.</div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default LightSetting;
