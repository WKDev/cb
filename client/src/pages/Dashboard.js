import React, { useEffect, useRef, useState } from "react";
import UnivCard from "../components/UnivCard";
import Container from "react-bootstrap/Container";
import TempContent from "../components/card_content/TempContent";
import LightContent from "../components/card_content/LightContent";
import "./Dashboard.css";
import BoilerContent from "../components/card_content/BoilerContent";
import AOContent from "../components/card_content/AOContent";
import CommonModal from "../components/card_content/CommonModal";
import axios from "axios";
import bg from "../components/assets/living-room-def.jpg";
import Toast from "react-bootstrap/Toast";

// Dan's useInterval hook https://overreacted.io/making-setinterval-declarative-with-react-hooks/
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

const Dashboard = () => {
  const [temp, setTemp] = useState("");
  const [humid, setHumid] = useState("");
  const [tempLED, setTempLED] = useState(false);
  const [cardType, setCardType] = useState("");
  const [showModal, setShowModal] = useState(false);

  // initial fetch data
  useEffect(() => {
    tempApi();
    return () => {};
  }, []);

  //it updated when one of elements are updated. this it not efficient at all. so i'd be improve the code.
  async function tempApi() {
    const url = "/api/iot/acdata";
    // axios
    //   .get(url)
    //   .then(function (res) {
    //     console.log(res.data);
    //     setTemp(res.data.temp);
    //     setHumid(res.data.humid);
    //     setTempLED(true);
    //     return () => {
    //       setTemp(res.data.temp);
    //       setHumid(res.data.humid);
    //       setTempLED(true);
    //     };
    //   })
    //   .catch(function (error) {
    //     console.log("실패");
    //     setTempLED(false);
    //   });

    await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.code);
        setTemp(res.temp);
        setHumid(res.humid);
        setTempLED(true);
      })
      .catch((error) => {
        console.log("Error occured importing ACData!");
        setTempLED(false);
      });
  }

  /////will be constitutied
  const triggerModal = (type) => {
    setShowModal(true);
    setCardType(type);
  };

  // Run every second
  const delay = 5000;

  useInterval(() => {
    // Make the request here
    /////////////////////////////MAKE THE REQUEST HERE!!!!1
    tempApi();
  }, delay);
  return (
    <div style={{ height: "100%" }}>
      <CommonModal
        show={showModal}
        close={() => {
          setShowModal(false);
        }}
        cardType={cardType}
      />
      <div className="content-box">
        <UnivCard
          ledOn={tempLED}
          mode={"Developing"}
          title={"Indoor"}
          content={<TempContent temp={temp + "°C"} humid={humid + "%"} />}
          onSettingClick={() => triggerModal("Indoor")}
        />
        <UnivCard
          ledOn={true}
          mode={"Developing"}
          title={"Outside"}
          content={<TempContent temp={"25"} humid={"60"} />}
          onSettingClick={() => triggerModal("Outside")}
        />
        <UnivCard
          title={"Light"}
          ledOn={true}
          mode={"Developing"}
          accordion={true}
          content={<LightContent />}
          onSettingClick={() => triggerModal("Light")}
        />
        <UnivCard
          title={"Boiler"}
          mode={"Developing"}
          content={<BoilerContent targetTemp={"NN°C"} />}
          onSettingClick={() => triggerModal("Boiler")}
        />
        <UnivCard
          title={"At-Once Control"}
          mode={"subtitle"}
          content={<AOContent />}
        />
        <UnivCard title={"Door"} mode={"Developing"} content={<AOContent />} />
      </div>
    </div>
  );
};

export default Dashboard;
