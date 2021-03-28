var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.end("Welcome! This is Cranberry BackendServer_test");
});

module.exports = router;
