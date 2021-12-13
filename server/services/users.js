const e = require("express");
const models = require("../models");
const multer = require("../services/multer");
const { Op } = require("sequelize");

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

function getProfileImg(req, res) {
  models.users
    .findOne({
      where: { nickname: req.params.id },
    })
    .then((user) => {
      models.images
        .findOne({
          where: { id: user.imageId },
        })
        .then((image) => {
          if (image != null) {
            res.status(200).send({
              success: true,
              data: {
                imgUrl: image.location,
              },
              message: "I gave you image URL",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

function setProfileImg(req, res) {
  models.users
    .findOne({
      where: { nickname: req.params.id },
    })
    .then((user) => {
      if (user.imageId != null) {
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
      res.status(200).send({
        success: true,
        data: {
          imgUrl: req.file.location,
        },
        message: "Image Uploaded",
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function getTag(req, res) {
  models.users
    .findOne({
      where: { nickname: req.params.id },
    })
    .then((user) => {
      models.users_tag
        .findAll({
          where: { userId: user.id },
          include: [
            {
              model: models.tags,
            },
          ],
        })
        .then((tags) => {
          var tagArr = [];
          tags.forEach((element) => {
            tagArr.push({
              tagName: element.dataValues.tag.string,
              tagId: element.dataValues.tag.id,
            });
          });
          res.status(200).send({
            success: true,
            data: {
              tagArr: tagArr,
            },
            message: "I gave you user tags",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

function setTag(req, res) {
  models.tags
    .findOne({
      where: { string: req.body.tag },
    })
    .then((tag) => {
      models.users
        .findOne({
          where: { jwt: req.body.googleId },
        })
        .then((user) => {
          if (tag == null) {
            models.tags
              .create({
                string: req.body.tag,
              })
              .then(() => {
                console.log(user);
                models.tags
                  .findOne({
                    where: { string: req.body.tag },
                  })
                  .then((tag) => {
                    console.log(tag);
                    models.users_tag.create({
                      userId: user.id,
                      tagId: tag.id,
                    });
                    res.status(200).send({
                      success: true,
                      message: "tag created",
                    });
                  })
                  .catch((err) => {
                    res.send({
                      success: false,
                      message: err,
                    });
                  });
              })
              .catch((err) => {
                res.send({
                  success: false,
                  message: err,
                });
              });
          } else {
            models.users_tag
              .findOne({
                where: {
                  [Op.and]: [{ userId: user.id }, { tagId: tag.id }],
                },
              })
              .then((exist) => {
                if (exist == null) {
                  models.users_tag.create({
                    userId: user.id,
                    tagId: tag.id,
                  });
                  res.status(200).send({
                    success: true,
                    message: "DB already has this tag",
                  });
                } else {
                  res.status(200).send({
                    success: true,
                    message: "User already has this tag",
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteTag(req, res) {
  models.users
    .findOne({
      where: { nickname: req.params.id },
    })
    .then((user) => {
      models.users_tag
        .destroy({
          where: {
            [Op.and]: [{ userId: user.id }, { tagId: req.params.tagId }],
          },
        })
        .then((tag) => {
          if (tag == 0) {
            res.status(200).send({
              success: true,
              message: "There is no tag",
            });
          } else if (tag == 1) {
            res.status(200).send({
              success: true,
              message: "Deleted",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
  getTag,
  setTag,
  deleteTag,
};
