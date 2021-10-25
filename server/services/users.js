const models = require("../models");

function createUser(req, res, next) {
  models.user.create({
    nickname: req.body.nickInput,
  });
  // .then((result) => {
  //   res.json(null);
  // })
  // .catch((err) => {
  //   console.error(err);
  // });
}

module.exports = {
  createUser,
};
