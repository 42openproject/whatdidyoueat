var express = require("express");
var router = express.Router();
const userService = require("../services/users");

/**
 * @swagger
 *  /users:
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
  user = userService.getUser(req, res, next);
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
