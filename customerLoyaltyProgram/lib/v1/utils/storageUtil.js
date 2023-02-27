const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext[ext.length - 1]);
  },
});

const uploadFilter = (allowedTypes = "") => {
  
  return (req, file, cb) => {
    let acceptedMemeTypes = [];
    switch (allowedTypes) {
      case "image":
        acceptedMemeTypes = ["image/png", "image/jpg", "image/jpeg", "image/svg+xml"];
        break;
      case "documnet":
        acceptedMemeTypes = ["application/msword", "application/pdf"];
        break;
      default:
        acceptedMemeTypes = allowedTypes;
    }
    if (acceptedMemeTypes.indexOf(file.mimetype) > -1) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
};


module.exports = {
  storage,
  uploadFilter,
};