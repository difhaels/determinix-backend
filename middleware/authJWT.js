const jwt = require("jsonwebtoken");

// Middleware untuk verifikasi token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Ambil token dari header

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifikasi token
    req.admin = decoded; // Simpan info admin ke req
    next(); // Lanjut ke fungsi berikutnya
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
