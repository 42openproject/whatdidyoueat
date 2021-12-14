const models = require("../models");

function createUser(req, res, next) {
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
        message: "Welcome newcomer",
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
        createUser(req, res, next);
      } else {
        if (user.nickname == null) {
          res.status(200).send({
            success: true,
            data: {
              isSigned: false,
            },
            message: "You can set nickname",
          });
        } else {
          res.status(200).send({
            success: true,
            data: {
              isSigned: true,
            },
            message: "It's already signed in",
          });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function loginGoogle(req, res) {
  if (req.body.googleId == undefined || req.body.email == undefined) {
    res.status(400).send({
      success: false,
      data: {
        isSigned: false,
      },
      message: "missing googleId or email in POST body",
    });
  } else {
    loginService.isSigned(req, res, next);
  }
}

module.exports = {
  loginGoogle,
  isSigned,
  createUser,
};
