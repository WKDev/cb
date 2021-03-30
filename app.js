const express = require("express"); // Express 서버
const cors = require("cors"); // 서버-클라이언트 통신간 중복되는 문제를 해결하기 위해 포함됨
const session = require("express-session"); // 세션 처리
const dotenv = require("dotenv"); // key 값 보관하고 관리하는 데 사용됨. 지금은 사용 안하는중
const path = require("path"); // static한 파일(React Build 폴더)에 접근할 수 있도록 Route 설정하는데 필요
const app = express();

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
// var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// app.use(indexRouter);
app.use("/api/users", usersRouter);

// portnumber를 5000으로 지정
const port = process.env.PORT || 5000;

// 3002번 포트넘버를 가진 서버 생성
app.listen(port, () => console.log(`listening on port ${port}!`));

//React Static 파일 제공하기
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname + "/client/build", "index.html"));
});
// 라우트 설정
