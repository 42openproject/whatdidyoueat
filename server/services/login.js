const models = require("../models");

function loginGoogle(req, res, next) {
  models.users
    .create({
      jwt: req.body.googleId,
      email: req.body.email,
    })
    .then(() => {
      res.status(200).send({
        success: true,
        data: {
          isSigned: false,
        },
        message: "You can sign in",
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

function isSigned(req, res, next) {
  models.users
    .findOne({
      where: { jwt: req.body.googleId },
    })
    .then((user) => {
      if (user == null) {
        loginGoogle(req, res, next);
      } else {
        res.status(200).send({
          success: true,
          data: {
            isSigned: true,
          },
          message: "It's already signed in",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  isSigned,
  loginGoogle,
};
