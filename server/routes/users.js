var express = require("express");
var router = express.Router();
const userService = require("../services/users");

/* GET users listing. */
router.post("/", function (req, res, next) {
  userService.createUser(req, res, next);
  console.log(req.body);
  res.send(req.body);
});

module.exports = router;
