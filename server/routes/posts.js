var express = require("express");
var router = express.Router();
const postService = require("../services/posts");
const multer = require("../services/multer");

/**
 * @swagger
 *  /posts/:id:
 *    posts:
 *      tags:
 *      - posts
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
router.get("/:id", function (req, res) {
  postService.getPost(req, res);
});

/**
 * @swagger
 *  /posts/:id:
 *    posts:
 *      tags:
 *      - posts
 *      description: 글을 게시합시다!
 *
 *      responses:
 *       200:
 *        description: 글 업로드 성공!s
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Posts'
 *
 */
router.post("/:id", multer.upload.single("file"), function (req, res) {
  postService.setPost(req, res);
});

module.exports = router;
