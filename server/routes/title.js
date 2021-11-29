var express = require("express");
var router = express.Router();
const titleServices = require("../services/title");

/**
 * @swagger
 *  /title/:id:
 *    get:
 *      tags:
 *      - title
 *      description: Ư�� date�� title ��ȸ
 *
 *      responses:
 *       200:
 *        description: title ��ȸ ����
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
 *      description: title �����ϱ�
 *
 *      responses:
 *       200:
 *        description: title ���� ����
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
