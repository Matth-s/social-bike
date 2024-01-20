const User = require('../database/models/user.model');

const { hashPassword, comparePassword } = require('../utils/bcrypt');
const {
  createJwtToken,
  refreshToken,
  checkToken,
} = require('../utils/token');

const signup = async (req, res) => {
  const { username, email, avatar, password, description } = req.body;

  if (!username || !email || avatar === undefined || !password) {
    return res
      .status(409)
      .json({ message: 'Tout les champs sont requis' });
  }

  const checkSameEmail = await User.findOne({ email });

  const checkSameUsername = await User.findOne({ username });

  if (checkSameEmail) {
    return res
      .status(409)
      .json({ message: 'Cet émail est déjà utilisé' });
  }

  if (checkSameUsername) {
    return res
      .status(409)
      .json({ message: "Ce nom d'utilisateur est déjà utilisé" });
  }

  try {
    const passwordHash = await hashPassword(password);

    const user = new User({
      username,
      email,
      password: passwordHash,
      avatar,
      description,
    });

    const savedUser = await user.save();

    const filteredUser = {
      username: savedUser.username,
      email: savedUser.email,
      id: savedUser._id.toString(),
      avatar: savedUser.avatar,
      description: savedUser.description,
    };

    const token = createJwtToken(user._id);

    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.status(201).json({
      message: 'Utilisateur crée',
      data: {
        user: filteredUser,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue' });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Email est mot de passe requis' });
  }

  try {
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res
        .status(400)
        .json({ message: 'Email ou mot de passe incorrecte' });
    }

    const user = new User(findUser);

    const match = await comparePassword({
      password: password,
      passwordHash: user.password,
    });

    if (!match) {
      return res
        .status(400)
        .json({ message: 'Email ou mot de passe incorrecte' });
    }

    const token = createJwtToken(user._id);

    const filteredUser = {
      username: user.username,
      email: user.email,
      id: user._id.toString(),
      avatar: user.avatar === '' ? null : user.avatar,
      description: user.description,
    };

    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.status(201).json({
      message: 'Utlisateur authentifié',
      data: {
        user: filteredUser,
        token,
      },
    });
  } catch (e) {
    res.status(500).json({ message: 'Erreur interne' });
  }
};

const signout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Utilisateur déconnecté' });
};

const refresh = async (req, res) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ message: 'Pas de token' });
  }

  const token = authorization.split(' ')[1];

  try {
    const refreshedToken = await refreshToken(token);

    if (refreshedToken) {
      res.cookie('jwt', refreshedToken, {
        httpOnly: true,
        sameSite: 'strict',
      });
      return res.status(200).json({ token: refreshedToken });
    }

    res.status(401).json({ message: 'Token expiré' });
  } catch (e) {
    res.status(500).json({
      message: "Erreur lors de la génération d'un nouveau token",
    });
  }
};

const currentUser = async (req, res) => {
  const cookie = req.cookies;

  if (!cookie) {
    return res.status(401).json({ message: 'Aucun utilisateur' });
  }

  const token = cookie.jwt;

  if (!token) {
    return res.status(401).json({ message: 'Aucun utilisateur' });
  }

  try {
    const tokenCheck = await checkToken(token);

    if (!tokenCheck) {
      return res.status(401).json({ message: 'Aucun utlisateur' });
    }

    const { sub } = tokenCheck;

    const user = await User.findOne({ _id: sub });

    if (!user) {
      return res.status(401).json({ message: 'Aucun utlisateur' });
    }

    const filteredUser = {
      username: user.username,
      id: user._id,
      avatar: user.avatar === '' ? null : user.avatar,
      description: user.description,
    };

    const newToken = createJwtToken(filteredUser.id);

    res.cookie('jwt', newToken, {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.status(200).json({
      message: 'Utilisateur connecté',
      data: {
        user: filteredUser,
        token: newToken,
      },
    });
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

module.exports = { signup, signin, signout, refresh, currentUser };
