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
          "Contnet-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    console.log(data);
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    return;
  }
};

module.exports = {
  getKakaoToken,
};
