const models = require("../models");

function getNickname(req, res) {
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

function setNickname(req, res) {
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

function getProfileImg(req, res) {}

function setProfileImg(req, res) {
  res.status(200).send(req.file.location);
}

module.exports = {
  setNickname,
  getNickname,
  getProfileImg,
  setProfileImg,
};
