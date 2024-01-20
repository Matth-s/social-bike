const { checkToken } = require('../utils/token');

const userVerificationToken = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.clearCookie('jwt');
    return res.status(401).json({ message: 'Non autorisé' });
  }

  const token = authorization.split(' ')[1];

  try {
    const validToken = checkToken(token, res);

    if (validToken) {
      return next();
    }

    return res.status(403).json({ message: 'Token expiré' });
  } catch (error) {
    console.error(error);
    res.clearCookie('jwt');
    return res.status(403).json({ message: 'Non autorisé' });
  }
};

module.exports = userVerificationToken;
