require('dotenv').config();
const mongoose = require('mongoose');

const connectToDb = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log('connexion établie');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectToDb;
