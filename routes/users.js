const USE_SOLAPI = false;
// const cors = require("cors"); // 서버-클라이언트 통신간 중복되는 문제를 해결하기 위해 포함됨
// const dotenv = require("dotenv"); // key 값 보관하고 관리하는 데 사용됨. 지금은 사용 안하는중
const express = require("express");
const router = express.Router(); // 새로 생겼어요!
const session = require("express-session"); // 세션 처리
var FileStore = require("session-file-store")(session);
const request = require("request");
var firebase = require("firebase");
var { config, msg } = require("solapi");

//기본 등록 여부 조회하는 단계에서 문자메시지를 보내게 되는데, 이 때 생성된 코드를 저장합니다.
// 이렇게 저장된 코드는 auth 라우터에서 request로 들어온 값을 검증하는데 사용됩니다.

// SOLAPI 설정
var authCode = "";

config.init({
  apiKey: "NCSJKXIANQ3IBSI2",
  apiSecret: "ZP0XIXILKLPTTRR9NJGXVV9Z94QBU15V",
});
async function sendSMS(targetPhone, code) {
  if (USE_SOLAPI) {
    const params = {
      messages: [
        {
          to: targetPhone,
          from: "01047383672",
          text: "시스템에 인증번호 [" + code + "]를 입력해 주세요.",
        },
      ],
    };

    try {
      const result = await msg.send(params);
      // console.log('RESULT:', result)
    } catch (e) {
      console.log("statusCode:", e.statusCode);
      console.log("errorCode:", e.error.errorCode);
      console.log("errorMessage:", e.error.errorMessage);
    }
  }
}

var firebaseConfig = {
  ßapiKey: "AIzaSyCxQQvNAtYmrBvfiL69T_ZT5f5mI7tbz9w",
  authDomain: "cranberry-f84d9.firebaseapp.com",
  databaseURL: "https://cranberry-f84d9-default-rtdb.firebaseio.com",
  projectId: "cranberry-f84d9",
  storageBucket: "cranberry-f84d9.appspot.com",
  messagingSenderId: "728439473986",
  appId: "1:728439473986:web:29f3baf38d2897e9feeadb",
  measurementId: "G-HJL0SVMQRL",
};

// Auth Code 생성
function codeGenerator() {
  var code = parseInt(Math.random() * 1000000);
  return String(code);
}
////////firebase Initialization
firebase.initializeApp(firebaseConfig);
const userRef = firebase.database().ref("approved_users");

//Session 설정
router.use(
  session({
    store: new FileStore(fileStoreOptions),
    secure: false,
    secret: "testKey",
    resave: false,
    saveUninitialized: false,
  })
);
var fileStoreOptions = { retries: 0 }; // 세션 저장 관련 처리

// 세션 확인
router.use("/session_check", function (req, res) {
  if (req.session.phone) {
    console.log("session exists : " + req.session.phone);
    res.json({ msg: "session exists", code: "200", session: req.session });
  } else {
    console.log("sess NOT exists");
    res.json({ msg: "session not exists", code: "500", session: req.session });
  }
});

router.post("/info_check", function (req, res, next) {
  // nodemon router을 사용하면 모니터링해서 변동사항 있을 시 자동 재시작.
  // console.log(req.body.phone + ' ' + req.body.purpose)

  codeGenerator();
  // writeUserData('01010101010', 'inout')
  userRef
    .orderByChild("phone")
    .equalTo(req.body.phone)
    .once("child_added", (snapshot) => {
      // console.log(typeof snapshot.val())
      var Arr = snapshot.val();
      // console.log(Arr)
      if (snapshot.val().phone === req.body.phone) {
        if (snapshot.val().purpose === req.body.purpose) {
          authCode = codeGenerator();
          console.log(authCode);

          sendSMS(req.body.phone, authCode);
          res.json({
            code: "202",
            status: "accepted",
          });
        } else {
          console.log("incorrect_purpose");
          res.json({
            code: "409",
            status: "incorrect_purpose",
          });
        }
      } else {
        console.log("not_exist");
        res.json({
          code: "409",
          status: "not exist",
        });
      }
    });
});

// 인증번호 확인
router.post("/code_check", (req, res, next) => {
  var sess = req.session;

  if (req.body.code === authCode) {
    // 성공 결과, 세션에 추가
    console.log(req.body.phone);
    req.session.phone = req.body.phone;
    req.session.purpose = req.body.purpose;
    req.session.valid = +new Date();
    // sess.save();
    // req.session.save();
    res.json({
      code: "202",
      status: "Authentication Success!",
      phone: sess.phone,
      purpose: sess.purpose,
      valid: sess.valid,
    });
  } else {
    res.json([
      {
        code: "409",
        status: "Authentication Failed!",
      },
    ]);
  }
});

router.post("/logout", (req, res) => {
  var sess = req.session;

  if (sess.phone) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ state: "logout" });
      }
    });
  } else {
    res.json({ state: "logout" });
  }
});

module.exports = router;
