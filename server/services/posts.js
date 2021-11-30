const models = require("../models");

function getPost(req, res, next) {
  models.users
    .findOne({
      where: { jwt: req.params.id },
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
      where: { jwt: req.params.id },
    })
    .then((user) => {
      models.posts.create({
        textContent: req.body.textContent,
        tagArr: req.body.tagArr.join(),
        userId: user.id,
      });
    });
}

module.exports = {
  getPost,
  createPost,
};
