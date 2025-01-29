const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const Admin = require("./models/Admin");
const Project = require("./models/project");

const memberRoutes = require("./routes/memberRoutes");
const projectRoutes = require("./routes/projectRoutes");
const activitiesRoutes = require("./routes/activitiesRoutes");
const articlesRoutes = require("./routes/articlesRoutes");

require("dotenv").config();

const uploadRoute = require("./controller/routeUpload");

const app = express();
const PORT = 5000;

app.use(cors());

// Koneksi ke database
connectDB();

// Middleware untuk parsing JSON
app.use(express.json());

// handle image cloudinary
app.use("/api/users", uploadRoute);

// endpoint untuk mendapatkan admin
app.get("/admin", async (req, res) => {
  try {
    const admin = await Admin.find();
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Prefix untuk rute member
app.use("/members", memberRoutes);

// Prefix untuk rute project
app.use("/projects", projectRoutes);

// Prefix untuk rute activity
app.use("/activities", activitiesRoutes);

// Endpoint untuk mendapatkan articles
app.use("/articles", articlesRoutes);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
