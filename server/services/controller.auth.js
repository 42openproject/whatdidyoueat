const models = require("../models");
const { Op } = require("sequelize");
const utils = require("../services/utils");
const axios = require("axios");
const { post } = require("../routes/login");

const getKakaoToken = async (req, res) => {
  try {
    const postData = {
      grant_type: "authorization_code",
      client_id: "ef084fec0e20540d0ba785135e185ae5",
      redirect_uri: "http://localhost:3000/callback/kakao",
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
    const KakaoUserInfo = await getKakaoUserInfo(data.access_token);
    console.log(KakaoUserInfo);
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    return;
  }
};

const getKakaoUserInfo = async (ACCESS_TOKEN) => {
  try {
    const { data } = await axios.post(`https://kapi.kakao.com/v2/user/me`, [], {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    return data;
  } catch (e) {
    console.log(e);
    return;
  }
};

module.exports = {
  getKakaoToken,
  getKakaoUserInfo,
};
