const { checkToken } = require('../utils/token');

const userVerificationToken = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.clearCookie('jwt');
    return res.status(401).json({ message: 'Non autorisé' });
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    res.clearCookie('jwt');
    return res.status(401).json({ message: 'Non autorisé' });
  }

  try {
    const validToken = checkToken(token);

    if (validToken) {
      return next();
    }

    res.status(403).json({ message: 'Token expiré' });
  } catch (error) {
    res.status(403).json({ message: 'Non autorisé' });
  }
};

module.exports = userVerificationToken;
