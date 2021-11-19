const models = require("../models");

function loginGoogle(req, res, next) {
  var temp = {
    success: "bool",
    message: "str",
  };
  res.send(temp);
}

module.exports = {
  loginGoogle,
};
