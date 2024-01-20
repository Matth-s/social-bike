const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storages/images');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        '=' +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
});

const uploadImage = (req, res) => {
  console.log(req.body);
};

module.exports = { uploadImage };
