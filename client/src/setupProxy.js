const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/ref_sess", {
      target: "http://localhost:5000/",
      changeOrigin: true,
    })
  );
};
