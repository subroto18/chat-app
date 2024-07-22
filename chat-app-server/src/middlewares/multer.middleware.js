const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/media");
  },
  filename: function (req, file, callback) {
    if (file.originalname.length > 6) {
      callback(
        null,
        file.fieldname +
          "-" +
          Date.now() +
          file.originalname.substr(file.originalname.length - 6)
      );
    } else {
      callback(null, file.fieldname + "-" + Date.now() + file.originalname);
    }
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
