const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  } catch (e) {
    throw e;
  }
};

const comparePassword = ({ password, passwordHash }) => {
  return bcrypt.compare(password, passwordHash);
};

module.exports = { hashPassword, comparePassword };
