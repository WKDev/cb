const USE_SOLAPI = true;

var express = require("express");
var firebase = require("firebase");
var { config, msg } = require("solapi");

var router = express.Router();

//기본 등록 여부 조회하는 단계에서 문자메시지를 보내게 되는데, 이 때 생성된 코드를 저장합니다.
// 이렇게 저장된 코드는 auth 라우터에서 request로 들어온 값을 검증하는데 사용됩니다.
var authCode = "";

config.init({
  apiKey: "NCSJKXIANQ3IBSI2",
  apiSecret: "ZP0XIXILKLPTTRR9NJGXVV9Z94QBU15V",
});
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

firebase.initializeApp(firebaseConfig);
const userRef = firebase.database().ref("approved_users");

// SOLAPI 설정
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

// Auth Code 생성
function codeGenerator() {
  var code = parseInt(Math.random() * 1000000);
  return String(code);
}

//인증 여부 확인
router.get("/session_check", (req, res) => {
  var sess = req.session;
  // sess.save(); // 세션 저장
  if (sess.phone) {
    console.log("current_session : " + sess.phone);

    res.json({
      isAuthorized: "1",
      code: "200",
      result: "login success",
      phone: sess.phone,
      purpose: sess.purpose,
      valid: sess.valid,
    });
  } else {
    console.log("sess_not_exist : " + sess.phone);

    res.redirect("/login");
  }
});

// 유효한 값인지 확인
router.post("/info_check", function (req, res, next) {
  // nodemon app을 사용하면 모니터링해서 변동사항 있을 시 자동 재시작.
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
  sess.phone = req.body.phone;
  sess.purpose = req.body.purpose;
  sess.valid = +new Date();
  sess.save();

  // console.log(req.body.code)
  // console.log(authCode)
  if (req.body.code === authCode) {
    // 성공 결과, 세션에 추가
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

//세션 발급해주기
router.post("/session", (req, res) => {
  console.log(req.body.phone);
  req.session.phone = req.body.phone;
  req.session.purpose = req.body.purpose;
  req.session.valid = +new Date();
  req.session.save();
  res.json({
    result: "login success",
    phone: req.session.phone,
    purpose: req.session.purpose,
    valid: req.session.valid,
  });
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

// add_data
function writeUserData(phone_number, purpose) {
  firebase.database().ref("approved_users/").push({
    phone: phone_number,
    purpose: purpose,
  });

  console.log("write Success!");
}

module.exports = router;

// 2XX Success
// 4.1. 200 OK
// 4.2. 201 Created
// 4.3. 202 Accepted
// 4.4. 204 No Content
// 4XX Client errors
// 5.1. 400 Bad Request
// 5.2. 401 Unauthorized
// 5.3. 403 Forbidden
// 5.4. 404 Not Found
// 5.5. 405 Method Not Allowd
// 5.6. 409 Conflict
// 5.7. 429 Too many Requests
// 5XX Server errors

// 출처: https://sanghaklee.tistory.com/61 [이상학의 개발블로그]
