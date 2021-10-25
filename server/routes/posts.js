var express = require("express");
var router = express.Router();
const postService = require("../services/posts");

/* POST posts listing. */
router.post("/", function (req, res, next) {
  postService.createPost(req, res, next);
  console.log(req.body);
  res.send(req.body);
});

module.exports = router;
