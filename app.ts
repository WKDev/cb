
const USE_SOLAPI = false;
// const cors = require("cors"); // 서버-클라이언트 통신간 중복되는 문제를 해결하기 위해 포함됨
// const dotenv = require("dotenv"); // key 값 보관하고 관리하는 데 사용됨. 지금은 사용 안하는중
const iotRouter = require("./routes/iot");
const usersRouter = require("./routes/users");
const firebase = require("firebase")
const express = require("express");
const session = require("express-session"); // 세션 처리
const path = require("path"); // static한 파일(React Build 폴더)에 접근할 수 있도록 Route 설정하는데 필요
// var FileStore = require("session-file-store")(session);
const request = require("request");
var { config, msg } = require("solapi");
const http = require("http");
const webSocketServer = require('websocket').server;
// 기본 포트를 app 객체에 설정

require('dotenv').config();




const port = process.env.PORT || 5000;

// express 객체 생성
const app = express();

app.use(express.json());

app.use("/api/iot", iotRouter);
app.use("/api/users", usersRouter);


//Express Server bining
//https://sub0709.tistory.com/40
var server = http.createServer(app).listen(port, ()=>{
  console.log("express server Listening at port : " + port)
})

//https://sub0709.tistory.com/40
// var wsServer = new webSocketServer({
//   httpServer:server
// });

//React Static 파일 제공하기( 리액트 express 위에 올릴 시 사용됨)
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/", function (req, res, next) {
  res.sendFile(path.join(__dirname + "/client/build", "index.html"));
});


// // WebSocket Event Handling
// // https://sub0709.tistory.com/40
// var eventHandler = {
// handleRequest : function(request) {
// console.log('Connection from origin ' + request.origin + '.');
// },
// handleMessage : function(message) {
// console.log(JSON.stringify(message));
// },
// handleClose : function(connection) {
// console.log("disconnected.");
// }
// };
// // wsServer.on('request', eventHandler.handleRequest);


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
