var express = require("express");
const { posts } = require(".");
var router = express.Router();
const googleService = require("../services/login");

/**
 * @swagger
 *  /login/google:
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
router.get("/google", function (req, res, next) {
  googleService.loginGoogle(req, res, next);
});
