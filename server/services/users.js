const models = require("../models");

function getNickname(req, res, next) {
  models.users
    .findOne({
      where: { jwt: req.query.googleId },
    })
    .then((user) => {
      var msg = {
        success: true,
        data: {
          nickname: user.nickname,
        },
        message: "success",
      };
      res.send(msg);
    })
    .catch((err) => {
      var msg = {
        success: false,
        message: err,
      };
      res.send(msg);
    });
}

function setNickname(req, res, next) {
  models.users
    .update(
      {
        nickname: req.body.nickname,
      },
      { where: { jwt: req.body.googleId } }
    )
    .then(() => {
      var temp = {
        success: true,
        message: "Success",
      };
      res.send(temp);
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = {
  setNickname,
  getNickname,
};
