var express = require("express");
var router = express.Router();
const exploreService = require("../services/explore");

router.get("/", function (req, res) {
  exploreService.explore(req, res);
});

module.exports = router;
