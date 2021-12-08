const models = require("../models");
const multer = require("../services/multer");

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
  models.users
    .findOne({
      where: { nickname: req.params.id },
    })
    .then((user) => {
      if (user.imageId != null) {
        console.log("user: " + user.imageId);
        models.images
          .findOne({
            where: { id: user.imageId },
          })
          .then((image) => {
            multer.deleteImg(image.key);
          })
          .then(() => {
            models.images.destroy({
              where: { id: user.imageId },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
      models.images
        .create({
          key: req.file.key,
          location: req.file.location,
        })
        .then(() => {
          models.images
            .findOne({
              where: { key: req.file.key },
            })
            .then((image) => {
              models.users.update(
                {
                  imageId: image.id,
                },
                { where: { id: user.id } }
              );
            })
            .catch((err) => {
              console.log(err);
            });
        });
      res.status(200).send(req.file.location);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  setNickname,
  getNickname,
  getProfileImg,
  setProfileImg,
};
