var express = require("express");
var router = express.Router();
const usersService = require("../services/users");
const multer = require("../services/multer");

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
router.get("/nickname", function (req, res) {
  usersService.getNickname(req, res);
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
router.post("/nickname", function (req, res) {
  usersService.setNickname(req, res);
});

/**
 * @swagger
 *  /api/img:
 *    get:
 *      tags:
 *      - get
 *      description: 이미지 관련 API
 *
 *      responses:
 *       200:
 *        description: 이미지 불러오기 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Posts'
 *
 */
router.get("/:id/profileImg", function (req, res) {
  usersService.getProfileImg(req, res);
});

/**
 * @swagger
 *  /api/img:
 *    post:
 *      tags:
 *      - post
 *      description: 이미지 관련 API
 *
 *      responses:
 *       200:
 *        description: 이미지 업로드 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Posts'
 *
 */
router.post(
  "/:id/profileImg",
  multer.upload.single("file"),
  function (req, res) {
    usersService.setProfileImg(req, res);
  }
);

module.exports = router;
