const models = require("../models");
const { Op } = require("sequelize");

function getTitle(req, res, next) {
  models.users
    .findOne({
      where: { nickname: req.params.id },
    })
    .then((user) => {
      models.titles
        .findOne({
          where: {
            [Op.and]: [
              { userId: user.id },
              {
                createdAt: {
                  [Op.lte]: req.query.date,
                },
              },
            ],
          },
        })
        .then((title) => {
          var msg = {
            success: true,
            data: {
              title: title.title,
            },
            message: "Success",
          };
          res.send(msg);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

function setTitle(req, res, next) {
  models.users
    .findOne({
      where: { jwt: req.body.googleId },
    })
    .then((user) => {
      console.log(req.body.title);
      models.titles
        .create({
          title: req.body.title,
          userId: user.id,
        })
        .then(() => {
          var msg = {
            success: true,
            message: "Success",
          };
          res.send(msg);
        });
    })
    .catch(() => {
      var msg = {
        success: false,
        message: "Fail",
      };
      res.send(msg);
    });
}

module.exports = {
  setTitle,
  getTitle,
};
