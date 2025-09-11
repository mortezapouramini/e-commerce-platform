const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedFiles = ["image/jpeg", "image/jpg", "image/png" , "image/webp"];
    if (!allowedFiles.includes(file.mimetype)) {
      return cb(new Error("Only  jpg , jpeg , png , webp allowed"));
    }
    cb(null, true);
  }
});



module.exports = upload