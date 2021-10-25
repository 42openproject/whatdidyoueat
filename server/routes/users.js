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
router.get("/", function (req, res, next) {
  userService.createUser(req, res, next);
  console.log(req.body);
  res.send(req.body);
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
  console.log(req.body);
  res.send(req.body);
});

/**
 * @swagger
 *  /users:
 *    put:
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
router.put("/", function (req, res, next) {
  userService.createUser(req, res, next);
  console.log(req.body);
  res.send(req.body);
});

/**
 * @swagger
 *  /users:
 *    delete:
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
router.delete("/", function (req, res, next) {
  userService.createUser(req, res, next);
  console.log(req.body);
  res.send(req.body);
});

module.exports = router;
