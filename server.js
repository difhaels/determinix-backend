const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");

const adminRoutes = require("./routes/adminRoutes");
const memberRoutes = require("./routes/memberRoutes");
const projectRoutes = require("./routes/projectRoutes");
const activitiesRoutes = require("./routes/activitiesRoutes");
const articlesRoutes = require("./routes/articlesRoutes");

const app = express();
const PORT = 5000;

app.use(cors());

// Koneksi ke database
connectDB();

// Middleware untuk parsing JSON
app.use(express.json());

// Prefix untuk rute admin
app.use("/admin", adminRoutes);

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
