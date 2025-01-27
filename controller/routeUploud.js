const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const uploud = require("../middleware/multer");

router.post("/uploud", uploud.single("image"), function (req, res) {
  cloudinary.uploader.upload(req.file.path, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error",
      });
    }

    res.status(200).json({
      success: true,
      message: "Uplouded!",
      data: result,
    });
  });
});

module.exports = router;
