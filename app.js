var express = require("express");
var app = express();
var cors = require("cors");
var session = require("express-session");

var dotenv = require("dotenv");

// React와의 통신을 위해 cors, express.json 사용
app.use(cors());
app.use(express.json());

// 세션 처리
app.use(
  session({
    HttpOnly: true,
    secure: true,
    secret: "testKey",
    resave: false,
    saveUninitialized: true,
  })
);

//Router 설정
app.use(express.urlencoded({ extended: true }));
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
app.use(indexRouter);
app.use("/users", usersRouter);

//인증 여부 확인
//세션 발급해주기
app.post("/ref_sess", (req, res) => {
  var sess = req.session;
  sess.save();

  if (sess.phone) {
    res.json({
      isAuthorized: "1",
      code: "200",
      result: "login success",
      phone: sess.phone,
      purpose: sess.purpose,
      valid: sess.valid,
    });
  } else {
    res.json({
      isAuthorized: "0",
      code: "400",
      result: "login failed",
    });
  }
});

// portnumber를 3002로 지정
const port = process.env.PORT || 5000;

// 3002번 포트넘버를 가진 서버 생성
app.listen(port, () => console.log(`listening on port ${port}!`));
