import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UnivCard from "../components/UnivCard";
import NavigationBar from "../components/bar/NavigationBar";
import StatusBar from "../components/bar/StatusBar";
import Container from "react-bootstrap/Container";
import TempContent from "../components/card_content/TempContent";
import LightContent from "../components/card_content/LightContent";
import "./Dashboard.css";
import BoilerContent from "../components/card_content/BoilerContent";
import AOContent from "../components/card_content/AOContent";
import CommonModal from "../components/card_content/CommonModal";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState("phone_not_yet_set");
  const [temp, setTemp] = useState("NN °C");
  const [humid, setHumid] = useState("NN %");
  const [tempLED, setTempLED] = useState(false);
  const [cardType, setCardType] = useState("");
  const [showModal, setShowModal] = useState(false);

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
        history.push("/login");
      });
  };

  async function tempApi() {
    const url = "/api/iot/acdata";
    await axios
      .get(url)
      .then(function (res) {
        console.log(res.data);
        return () => {
          setTemp(data.temp);
          setHumid(data.humid);
          setTempLED(false);
        };
      })
      .catch(function (error) {
        console.log("실패");
        setTempLED(false);
      });
  }
  tempApi();

  const triggerModal = (type) => {
    setShowModal(true);
    setCardType(type);
  };

  return (
    <div>
      <CommonModal
        show={showModal}
        close={() => {
          setShowModal(false);
        }}
        cardType={cardType}
      />
      <NavigationBar phone={"phone_not_yet_set"} />
      <StatusBar phone={"phone_not_yet_set"} logout={handleLogout} />
      <Container fluid bsPrefix="content-box" className="content-box">
        <UnivCard
          ledOn={tempLED}
          mode={"Developing"}
          title={"Indoor"}
          content={<TempContent temp={temp} humid={humid} />}
          onSettingClick={() => {
            setShowModal(true);
            setCardType("Indoor");
          }}
        />
        <UnivCard
          ledOn={true}
          mode={"Developing"}
          title={"Outside"}
          content={<TempContent temp={"25"} humid={"60%"} />}
          onSettingClick={() => {
            setShowModal(true);
            setCardType("Outside");
          }}
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
      </Container>
    </div>
  );
};

export default Dashboard;
