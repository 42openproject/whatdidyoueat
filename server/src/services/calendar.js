const models = require("../models");
const { Op } = require("sequelize");

function getCalendar(req, res, next) {
  models.users
    .findOne({
      where: { nickname: req.params.id },
    })
    .then((user) => {
      var month = ("0" + req.query.month).slice(-2);
      var date = new Date(req.query.year + "-" + month);
      var before = new Date(date.getTime());
      var after = new Date(date.getTime());
      before.setMonth(before.getMonth() - 1);
      after.setMonth(after.getMonth() + 2);
      after.setSeconds(after.getSeconds() - 1);

      models.posts
        .findAll({
          where: {
            [Op.and]: [
              { userId: user.id },
              {
                createdAt: {
                  [Op.between]: [before, after],
                },
              },
            ],
          },
        })
        .then((posts) => {
          if (posts != null) {
            console.log(posts);
            var postedDate = [];
            posts.map((post) => {
              var createdAt = new Date(post.dataValues.createdAt);
              postedDate.push(Number(createdAt.getTime()));
            });
            postedDate.sort((a, b) => a - b);
            var dateString = postedDate.map((date) => {
              date = new Date(date);
              var year = date.getFullYear();
              var month = ("0" + (date.getMonth() + 1)).slice(-2);
              var day = ("0" + date.getDate()).slice(-2);
              return year + "-" + month + "-" + day;
            });
            dateString = dateString.filter((element, index) => {
              return dateString.indexOf(element) === index;
            });
          }
          var startedAt = new Date(user.createdAt);
          var year = startedAt.getFullYear();
          var month = ("0" + (startedAt.getMonth() + 1)).slice(-2);
          var day = ("0" + startedAt.getDate()).slice(-2);
          startedAt = year + "-" + month + "-" + day;
          res.status(200).send({
            success: true,
            data: {
              date: dateString,
              startedAt: startedAt,
            },
            message: "Found posts",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  getCalendar,
};
