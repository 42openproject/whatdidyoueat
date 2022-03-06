const models = require("../models");
const { Op } = require("sequelize");
const utils = require("../services/utils");
const axios = require("axios");
const { post } = require("../routes/login");

const getKakaoToken = async (req, res) => {
  try {
    const postData = {
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_CLIENT_ID,
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      code: req.query.code,
    };
    const params = new URLSearchParams(postData).toString();

    const { data } = await axios.post(
      `https://kauth.kakao.com/oauth/token?${params}`,
      [],
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );

    const KakaoUserInfo = await axios.post(
      `https://kapi.kakao.com/v2/user/me`,
      [],
      {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );

    userData = KakaoUserInfo.data.kakao_account;

    const user = await findOrCreate(userData.email, "kakao", data.access_token);

    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    return;
  }
};

const findOrCreate = async (email, login_type, token) => {
  const user = await models.users.findOne({
    where: { email },
    attributes: ["id", "email"],
  });

  if (!user) {
    const user = await models.users.create({
      email: email,
      // login_type: login_type,
      jwt: token,
    });
    console.log(user);
  }
};

module.exports = {
  getKakaoToken,
};
