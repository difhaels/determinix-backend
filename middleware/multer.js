const multer = require("multer");
const path = require("path");

// Konfigurasi penyimpanan file sementara sebelum dikirim ke Cloudinary
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;
