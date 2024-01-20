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
    throw new Error('Erreur lors de la vérification du token');
  }
};

const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = {
  createJwtToken,
  refreshToken,
  checkToken,
};
