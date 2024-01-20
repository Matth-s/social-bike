const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: { type: String },
  avatar: { type: String, default: null },
  description: { type: String },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
