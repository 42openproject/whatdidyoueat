var express = require("express");
const { post } = require(".");
var router = express.Router();
const postService = require("../services/post");

/**
 * @swagger
 *  /post/:id:
 *    post:
 *      tags:
 *      - post
 *      description: 내가 쓴 글을 다 가져옵니다.
 *
 *      responses:
 *       200:
 *        description: 잘 가져왔다!
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Posts'
 *
 */
router.get("/:id", function (req, res, next) {
  postService.getPost(req, res, next);
});

/**
 * @swagger
 *  /post/:id:
 *    post:
 *      tags:
 *      - post
 *      description: 글을 게시합시다!
 *
 *      responses:
 *       200:
 *        description: 글 업로드 성공!
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Posts'
 *
 */
router.post("/:id", function (req, res, next) {
  postService.createPost(req, res, next);
  res.send(req.body);
});

module.exports = router;
