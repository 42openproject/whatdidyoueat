const jwt = require("jsonwebtoken");



const generateToken = async (user) => {
  const access_token = generateAccessToken(user);
  const refresh_token = await generateRefreshToken(user);
  return { access_token, refresh_token };
};
