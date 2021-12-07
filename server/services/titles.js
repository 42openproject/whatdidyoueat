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
                  [Op.lte]: req.query.date + " 23:59:59",
                },
              },
            ],
          },
          order: [["createdAt", "DESC"]],
        })
        .then((titles) => {
          if (titles == null) {
            res.send({
              success: false,
              message: "No Title",
            });
          } else {
            res.send({
              success: true,
              data: {
                title: titles.title,
              },
              message: "Success",
            });
          }
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
      var today = new Date();

      var year = today.getFullYear();
      var month = ("0" + (today.getMonth() + 1)).slice(-2);
      var day = ("0" + today.getDate()).slice(-2);

      var dateString = year + "-" + month + "-" + day;

      models.titles
        .findOne({
          where: {
            [Op.and]: [
              { userId: user.id },
              {
                createdAt: {
                  [Op.between]: [dateString, dateString + " 23:59:59"],
                },
              },
            ],
          },
        })
        .then((title) => {
          if (title == null) {
            models.titles
              .create({
                title: req.body.title,
                userId: user.id,
              })
              .then(() => {
                res.send({
                  success: true,
                  message: "Success",
                });
              })
              .catch(() => {
                res.send({
                  success: false,
                  message: "Fail",
                });
              });
          } else {
            models.titles
              .update(
                {
                  title: req.body.title,
                },
                {
                  where: {
                    [Op.and]: [
                      { userId: user.id },
                      {
                        createdAt: {
                          [Op.between]: [dateString, dateString + " 23:59:59"],
                        },
                      },
                    ],
                  },
                }
              )
              .then(() => {
                res.send({
                  success: true,
                  message: "Success",
                });
              })
              .catch(() => {
                res.send({
                  success: false,
                  message: "Fail",
                });
              });
          }
        })
        .catch(() => {
          res.send({
            success: false,
            message: "Fail",
          });
        });
    })
    .catch(() => {
      res.send({
        success: false,
        message: "Fail",
      });
    });
}

module.exports = {
  setTitle,
  getTitle,
};
