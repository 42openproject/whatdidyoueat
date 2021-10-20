const models = require("../models");

function createPost(req, res, next) {
  models.post.create({
    post_content: req.body.postContent,
    tag_arr: req.body.tagArr[0],
  });
}

module.exports = {
  createPost,
};
