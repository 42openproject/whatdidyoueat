const models = require("../models");

function getUser(req, res, next) {
  models.user
    .findOne({
      where: { jwt: req.params.id },
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

function createUser(req, res, next) {
  models.user.create({
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
  getUser,
  createUser,
};
