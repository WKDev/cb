const WebSocket = require("ws");

module.exports = (server) => {
  const wss = new WebSocket.server({ server });

  wss.on("connection", (ws, req) => {
    // 웹소켓 연결시
    const ip = req.headers["x-forwarded-for"];
    console.log("새로운 클라이언트 접속", ip);
    ws.on("message", (message) => {
      // 클라이언트로부터 메시지 수신 시
      console.log(message);
    });
    ws.on("error", (message) => {
      // 에러 발생시
      console.log(message);
    });
    ws.on("close", () => {
      // 연결 종료시
      console.log("클라이언트 접속 해제");
      clearInterval(ws.interval);
    });

    ws.interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        ws.send("서버에서 클라이언트로 메시지를 보냅니다.");
      }
    }, 3000);
  });
};
