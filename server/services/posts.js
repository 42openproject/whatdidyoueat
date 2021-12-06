const models = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

function getPost(req, res, next) {
  models.users
    .findOne({
      where: { nickname: req.params.id },
    })
    .then((user) => {
      var from = req.query.date + " 00:00:00";
      var to = req.query.date + " 23:59:59";
      models.posts
        .findAll({
          where: {
            [Op.and]: [
              { userId: user.dataValues.id },
              {
                createdAt: {
                  [Op.between]: [from, to],
                },
              },
            ],
          },
        })
        .then((post) => {
          var dataObj = post.map((p) => {
            const createdAt = new Date(p.dataValues.createdAt);
            return {
              createdAt: createdAt.toLocaleString("ko-KR", {
                timeZone: "Asia/Seoul",
              }),
              imageUrl: "Not Yet",
              textContent: p.dataValues.textContent,
              tagArr: p.dataValues.tagArr,
            };
          });

          res.status(200).send({
            success: true,
            data: dataObj,
            message: "Post loaded",
          });
        });
    });
}

function createPost(req, res, next) {
  models.users
    .findOne({
      where: { nickname: req.params.id },
    })
    .then((user) => {
      models.posts
        .create({
          textContent: req.body.textContent,
          tagArr: req.body.tagArr.join(),
          userId: user.id,
        })
        .then(() => {
          res.status(200).send({
            success: true,
            message: "Post uploaded",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
}

module.exports = {
  getPost,
  createPost,
};
