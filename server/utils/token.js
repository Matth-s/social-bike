require('dotenv').config();
const jwt = require('jsonwebtoken');

const createJwtToken = (id) => {
  const token = jwt.sign(
    {
      sub: id.toString(),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4,
    },
    process.env.JWT_SECRET
  );

  return token;
};

const refreshToken = async (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET, {
      ignoreExpiration: true,
    });
    const tokenExp = decodedToken.exp;
    const nowInSec = Math.floor(Date.now() / 1000);

    if (nowInSec > tokenExp && nowInSec - tokenExp < 60 * 60 * 24) {
      const refreshedToken = createJwtToken({ id: decodedToken.sub });
      jwt.verify(refreshedToken, process.env.JWT_SECRET);
      return refreshedToken;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

const checkToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createJwtToken,
  refreshToken,
  checkToken,
};
