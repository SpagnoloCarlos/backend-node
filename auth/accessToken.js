import jwt from "jsonwebtoken";

export const createToken = (clientDB) => {
  const payload = {
    clientId: clientDB.clientId,
    username: clientDB.username,
  };

  const expiresMsg = Number(process.env.EXPIRES_TOKEN.slice(0, -1)) * 3600;

  const tokenInfo = {
    token: jwt.sign(payload, process.env.SECRET_TOKEN, {
      expiresIn: process.env.EXPIRES_TOKEN,
    }),
    refreshToken: jwt.sign(payload, process.env.SECRET_TOKEN, {
      expiresIn: process.env.EXPIRES_REFRESH_TOKEN,
    }),
    expiresIn: expiresMsg,
  };

  return tokenInfo;
};
