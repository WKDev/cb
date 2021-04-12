const express = require("express");
const router = express.Router(); // 새로 생겼어요!
const USE_NODEMCU = false;

router.post("/light", function (req, res) {
  //   const lightRef = firebase.database().ref("iot/light");
  if (USE_NODEMCU) {
    // request(
    //   "http://192.168.142.145/api/acdata",
    //   function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //       console.log(body); // Show the HTML for the Google homepage.
    //       res.json(body);
    //     } else {
    //       console.log(error);
    //     }
    //   }
    // );
    //
  } else {
    //stackoverflow.com/questions/54501122/updating-data-within-a-unique-randomly-generated-id-key-in-firebase-using-html
    console.log(req.body);
    res.json({ name: req.body.name, state: req.body.state, result: "ok" });
  }
});

router.get("/acdata", function (req, res) {
  if (USE_NODEMCU) {
    // request(
    //   "http://192.168.142.145/api/acdata",
    //   function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //       console.log(body); // Show the HTML for the Google homepage.
    //       res.json(body);
    //     } else {
    //       console.log(error);
    //     }
    //   }
    // );
    //
  } else {
    res.json({ temp: "temp", humid: "humid" });
  }
});

module.exports = router;
