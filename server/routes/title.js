var express = require("express");
var router = express.Router();
const titleServices = require("../services/title");

/**
 * @swagger
 *  /title/:id:
 *    get:
 *      tags:
 *      - title
 *      description: 특정 date의 title 조회
 *
 *      responses:
 *       200:
 *        description: title 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Titles'
 *
 */
router.get("/:id", function (req, res, next) {
  titleServices.getTitle(req, res, next);
});

/**
 * @swagger
 *  /title/:id:
 *    post:
 *      tags:
 *      - title
 *      description: title 수정하기
 *
 *      responses:
 *       200:
 *        description: title 수정 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Titles'
 *
 */
router.post("/:id", function (req, res, next) {
  titleServices.setTitle(req, res, next);
});

module.exports = router;
