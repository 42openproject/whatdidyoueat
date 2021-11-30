const models = require("../models");

function getTitle(req, res, next) {
  function getUserId(req, res, next) {
    return models.users
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  models.users
    .findOne({
      where: { nickname: req.params.id },
    })
    .then((user) => {
      models.return(user);
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
