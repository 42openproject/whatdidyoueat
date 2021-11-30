var express = require("express");
var router = express.Router();
const calendarService = require("../services/calendar");

/**
 * @swagger
 *  /calendar/:id:
 *    calendar:
 *      tags:
 *      - calendar
 *      description: 이번 달 몇 일에 먹었는지 가져옵니다.
 *
 *      responses:
 *       200:
 *        description: 잘 가져왔다!
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Calendar'
 *
 */
router.get("/:id", function (req, res, next) {
  calendarService.getCalendar(req, res, next);
});

module.exports = router;
