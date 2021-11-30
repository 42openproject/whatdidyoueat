const models = require("../models");

function getCalendar(req, res, next) {
  models.users
    .findAll({
      where: {
        jwt: req.params.id,
      },
    })
    .then((user) => {
      models.posts
        .findAll({
          where: { userId: user.dataValues.id },
        })
        .then((post) => {
          res.send(post);
        });
    });
}

module.exports = {
  getCalendar,
};
