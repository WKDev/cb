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

const Dashboard = () => {
  const [data, setData] = useState("phone_not_yet_set");
  const [temp, setTemp] = useState("NN °C");
  const [humid, setHumid] = useState("NN %");
  const [cardType, setCardType] = useState("");
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();
  //초기 정보 가져오기--> 이건 그냥 Routes에서 가져와도 될 것 것 같은데 일단은 그냥 두는걸로
  // useEffect(() => {
  //     const requestOptions = {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //     }
  //     fetch('/ref_sess', requestOptions)
  //         .then((res) => res.json())
  //         .then((users) => {
  //             console.log(users.result)
  //             setData(users.phone)
  //         })
  //     handleROS()
  //     update_ac()
  // }, [])

  useEffect(() => {
    // handleROS();
  }, [temp, humid]);

  // const handleROS = () => {
  //   ros.connect("ws://10.211.55.3:9090/");
  //   // ros.connect('ws://roswebsocket.iptime.org:9090/')

  //   ros.on("error", function (error) {
  //     console.log(error);
  //   });

  //   ros.on("connection", function () {
  //     console.log("Connection made!");
  //   });

  //   ros.on("close", function () {
  //     console.log("Connection closed.");
  //   });
  // };

  // function update_ac() {
  //   var ac_data_subscriber = new ROSLIB.Topic({
  //     ros: ros,
  //     name: "/ac_msg",
  //     messageType: "cbt/AcData",
  //   });

  //   // Then we add a callback to be called every time a message is published on this topic.
  //   ac_data_subscriber.subscribe(function (message) {
  //     // console.log('Received message on ' + ac_data_subscriber.name + ': ' + message.temp + '  |  ' + message.humid);

  //     setTemp(message.temp.toFixed(1) + "°C");
  //     setHumid(message.humid.toFixed(1) + "%");
  //   });
  // }

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
      .then((users) => {
        console.log("logout_success");
        history.push("/login");
      });
  };

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
      <NavigationBar phone={data} />
      <StatusBar phone={data} logout={handleLogout} />
      <Container fluid bsPrefix="content-box" className="content-box">
        <UnivCard
          ledOn={true}
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
          content={<TempContent temp={temp} humid={humid} />}
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
