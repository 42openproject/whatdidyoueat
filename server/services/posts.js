const models = require("../models");

function getPost(req, res, next) {
  models.users
    .findOne({
      where: { nickname: req.params.id },
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
