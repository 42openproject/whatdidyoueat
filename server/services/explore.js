const models = require("../models");
const { Op } = require("sequelize");
const utils = require("../services/utils");

async function getTitle(date) {
  let title = await models.titles.findOne({
    where: {
      [Op.and]: [
        { userId: user.id },
        {
          createdAt: {
            [Op.lte]: utils.dateToYMD(date) + " 23:59:59",
          },
        },
      ],
    },
    order: [["createdAt", "DESC"]],
  });
  return title.title;
}

function explore(req, res) {
  models.posts
    .findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: models.users,
        },
        {
          model: models.images,
        },
      ],
      limit: 10,
    })
    .then(async (posts) => {
      let temp = posts.map(async (post) => {
        user = post.user;
        return {
          nickname: user.nickname,
          userPostTitle: await getTitle(post.createdAt),
          createdAt: post.createdAt,
          imageUrl: post.image.location,
          textContent: post.textContent,
          tagArr: post.tagArr,
        };
      });
      res.status(200).send({
        success: true,
        data: {
          posts: await Promise.all(temp),
        },
        message: "Found posts",
      });
    });
}

module.exports = {
  explore,
};
