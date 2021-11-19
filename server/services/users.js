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

function getNickname(req, res, next) {
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

function setNickname(req, res, next) {
  models.users
    .create({
      nickname: req.body.nickname,
      jwt: req.body.googleId,
    })
    .then(() => {
      var temp = {
        success: "True",
        message: "Good Bo",
      };
      res.send(temp);
    });
  // .then((result) => {
  //   res.json(null);
  // })
  // .catch((err) => {
  //   console.error(err);
  // });
}

module.exports = {
  setNickname,
  getNickname,
  getGoogleId,
};
