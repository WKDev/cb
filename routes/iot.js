const express = require("express");
const request = require("request");
const firebase = require("firebase");
const querystring = require("querystring");
const router = express.Router(); // 새로 생겼어ㄴ요!
const http = require("http");
const axios = require("axios");
const USE_NODEMCU = false;
require("dotenv").config();

//PERIODICALLY UPDATES ACDATA TO FIREBASE
async function updateACData() {
  await setInterval(() => {
    request(process.env.AC_UNIT, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        firebase
          .database()
          .ref("iot/record/acdata")
          .update({
            [+new Date()]: {
              timestamp: +new Date(),
              temp: JSON.parse(body).temp,
              humid: JSON.parse(body).humid,
            },
          });
      } else {
        console.log(error);
      }
    });
    console.log("AC Data pushed to firebase successfully!");
  }, 1000 * 60 * 30); // 1000(ms)*60(sec)*1(min)
}

updateACData();

//FETCH DATA FROM LIGHT && UPDATE CHANGES TO FIREBASE
router.post("/light", function (req, res) {
  //updates light state
  const jsonVariable = {};
  jsonVariable[req.body.name] = {
    name: req.body.name,
    mode: "test",
    state: req.body.state,
  };
  firebase.database().ref("iot/state/light").update(jsonVariable);

  console.log("data from api/light : " + JSON.stringify(req.body));
  axios
    .post(
      String(process.env.LIGHT12_UNIT),
      querystring.stringify({
        target: req.body.name,
        state: req.body.state,
      })
    )
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    });
});

// FETCH AC_DATA FROM NODEMCU
router.get("/acdata", function (req, res) {
  if (true) {
    request(process.env.AC_UNIT, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        // console.log(body); // Show the HTML for the Google homepage.
        res.json(JSON.parse(body));
        clearTimeout();
      } else {
        res.json({
          temp: String("err"),
          humid: String("err"),
        });
        console.log(error);
      }
    });
  } else {
    res.json({
      temp: "err",
      humid: "err",
    });
  }
});

// SEND SAVED DATA TO FRONTEND. REACT REQUIRES THIS ROUTE AT START.
router.get("/fetchdata/light", (req, res) => {
  var arr = {
    light1: { mode: "test2", name: "light1", state: "false" },
    light2: { mode: "test2", name: "light2", state: "false" },
  };
  firebase
    .database()
    .ref("iot/state")
    .orderByChild("name")
    .once("child_added", (snapshot) => {
      // console.log(snapshot.val());
      console.log("fetched light data successfully!");

      axios
        .post(
          String(process.env.LIGHT12_UNIT),
          querystring.stringify({
            target: "light1",
            state: snapshot.val().light1.state,
          })
        )
        .then((response) => {
          // console.log(response.data);
        });

      axios
        .post(
          String(process.env.LIGHT12_UNIT),
          querystring.stringify({
            target: "light2",
            state: snapshot.val().light2.state,
          })
        )
        .then((response) => {
          // console.log(response.data);
        });
      res.json(snapshot.val());
    });
});

// get acdata from firebase
router.post("/fetchdata/acstat", (req, res) => {
  firebase
    .database()
    .ref("iot/record/acdata")
    .orderByChild("timestamp")
    .startAt(req.body.from)
    .endAt(req.body.until)
    // .endAt(req.body.until)
    .once("value", (snapshot) => {
      if (snapshot.val() !== null) {
        res.json(snapshot.val());
      } else {
        res.json({});
      }
    });
});

router.get("/fetchdata/approvedusers", (req, res) => {
  firebase
    .database()
    .ref("approved_users")
    .once("value", (snapshot) => {
      // console.log(snapshot.val());
      res.json(snapshot.val());
      // console.log("above is data got from firebase");
    });
});

router.post("/update/approvedusers", function (req, res) {
  firebase.database().ref("approved_users").push({
    access_level: req.body.access_level,
    phone: req.body.phone,
    purpose: req.body.purpose,
    memo: req.body.memo,
    valid_until: req.body.valid_until,
  });
});

module.exports = router;
