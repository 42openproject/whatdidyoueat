const models = require("../models");
const { Op } = require("sequelize");

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
          include: [
            {
              model: models.images,
            },
          ],
        })
        .then((post) => {
          var dataObj = post.map((element) => {
            const createdAt = new Date(element.dataValues.createdAt);
            return {
              createdAt: createdAt.toLocaleString("ko-KR", {
                timeZone: "Asia/Seoul",
              }),
              imageUrl: element.dataValues.image.location,
              textContent: element.dataValues.textContent,
              tagArr: element.dataValues.tagArr,
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

function setPost(req, res, next) {
  models.users
    .findOne({
      where: { jwt: req.body.googleId },
    })
    .then((user) => {
      models.images
        .create({
          key: req.file.key,
          location: req.file.location,
        })
        .then(() => {
          models.images
            .findOne({
              where: { key: req.file.key },
            })
            .then((image) => {
              models.posts
                .create({
                  textContent: req.body.textContent,
                  tagArr: req.body.tagArr,
                  userId: user.id,
                  imageId: image.id,
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
            })
            .catch((err) => {
              console.log(err);
            });
        });
    });
}

module.exports = {
  getPost,
  setPost,
};
