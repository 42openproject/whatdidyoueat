const models = require("../models");

function loginGoogle(req, res, next) {
  models.users
    .create({
      jwt: req.body.googleId,
      email: req.body.email,
    })
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
  loginGoogle,
};
