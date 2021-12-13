const models = require("../models");
const { Op } = require("sequelize");

function getCalendar(req, res, next) {
  models.users
    .findOne({
      where: { nickname: req.params.id },
    })
    .then((user) => {
      var month = ("0" + req.query.month).slice(-2);
      var startDate = new Date(req.query.year + "-" + month);
      var endDate = new Date(req.query.year + "-" + month);
      endDate.setMonth(req.query.month);
      models.posts
        .findAll({
          where: {
            [Op.and]: [
              { userId: user.id },
              {
                createdAt: {
                  [Op.between]: [startDate, endDate],
                },
              },
            ],
          },
        })
        .then((posts) => {
          var postedDate = [];
          if (posts != null) {
            posts.map((post) => {
              var createdAt = new Date(post.dataValues.createdAt);
              postedDate.push(Number(createdAt.getDate()));
            });
            postedDate = postedDate.filter((element, index) => {
              return postedDate.indexOf(element) === index;
            });
            console.log(typeof postedDate[0]);
            postedDate.sort((a, b) => a - b);
          }
          res.status(200).send({
            success: true,
            data: {
              date: postedDate,
              startedAt: user.createdAt,
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
