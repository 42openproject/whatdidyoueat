const models = require("../models");

function getGoogleId(req, res, next) {
  models.users
    .findOne({
      where: { nickname: req.params.nickname },
    })
    .then((user) => {
      console.log(user);
      res.send(user);
    });
  // .then((result) => {
  //   res.json(null);
  // })
  // .catch((err) => {
  //   console.error(err);
  // });
}

function getUser(req, res, next) {
  models.users
    .findOne({
      where: { jwt: req.params.id },
    })
    .then((user) => {
      res.send(user);
    });
  // .then((result) => {
  //   res.json(null);
  // })
  // .catch((err) => {
  //   console.error(err);
  // });
}

function createUser(req, res, next) {
  models.users.create({
    nickname: req.body.nickInput,
    jwt: req.body.googleId,
  });
  // .then((result) => {
  //   res.json(null);
  // })
  // .catch((err) => {
  //   console.error(err);
  // });
}

module.exports = {
  getGoogleId,
  getUser,
  createUser,
};
