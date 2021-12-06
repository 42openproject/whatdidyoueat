const models = require("../models");

function uploadImg(req, res, next) {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
}

module.exports = {
  uploadImg,
};
