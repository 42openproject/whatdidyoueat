var express = require("express");
var router = express.Router();
const userService = require("../services/users");

/**
 * @swagger
 *  /users/:id:
 *    get:
 *      tags:
 *      - users
 *      description: user목록
 *
 *      responses:
 *       200:
 *        description: user성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *
 */
router.get("/:id", function (req, res, next) {
  users = userService.getUser(req, res, next);
});

/**
 * @swagger
 *  /users/nickname/:nickname:
 *    get:
 *      tags:
 *      - users
 *      description: 닉네임으로 구글 아이디 얻기
 *
 *      responses:
 *       200:
 *        description: 구글 아이디 게또
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *
 */
router.get("/nickname/:nickname", function (req, res, next) {
  users = userService.getGoogleId(req, res, next);
});

/**
 * @swagger
 *  /users:
 *    post:
 *      tags:
 *      - users
 *      description: user목록
 *
 *      responses:
 *       200:
 *        description: user성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *
 */
router.post("/", function (req, res, next) {
  userService.createUser(req, res, next);
  res.send(req.body);
});

module.exports = router;