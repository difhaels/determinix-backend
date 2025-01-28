const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const Admin = require("./models/Admin");
const Member = require("./models/member");
const Project = require("./models/project");
const Activities = require("./models/activities");
const Articles = require("./models/articles");

const memberRoutes = require("./routes/memberRoutes");
const projectRoutes = require("./routes/projectRoutes");
const activitiesRoutes = require("./routes/activitiesRoutes");
const articlesRoutes = require("./routes/articlesRoutes");

require('dotenv').config();

const uploadRoute = require('./controller/routeUpload');

const app = express();
const PORT = 5000;

app.use(cors());

// Koneksi ke database
connectDB();

// console.log(process.env.CLOUDINARY_API_KEY);

// Middleware untuk parsing JSON
app.use(express.json());

// handle image cloudinary
app.use("/api/users" , uploadRoute);

// endpoint untuk mendapatkan admin
app.get("/admin", async (req, res) => {
  try {
    const admin = await Admin.find();
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint untuk mendapatkan data anggota
// app.get("/members", async (req, res) => {
//   try {
//     const members = await Member.find();
//     res.json(members);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
app.use("/members", memberRoutes);

// Prefix untuk rute proyek
app.use("/projects", projectRoutes)

// Endpoint untuk mendapatkan Activities
app.use("/activities", activitiesRoutes)

// Endpoint untuk mendapatkan articles
app.use("/articles",  articlesRoutes)

// Endpoint untuk mendapatkan member berdasarkan ID
app.use("/member", memberRoutes)

// Endpoint untuk mendapatkan activity berdasarkan ID
app.get("/activities/:id", async (req, res) => {
  const { id } = req.params; // Mendapatkan ID dari parameter URL
  try {
    // Menemukan proyek berdasarkan ID
    const activity = await Activities.findById(id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(activity); // Mengirimkan data proyek sebagai respons
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint untuk mendapatkan articles berdasarkan ID
app.get("/articles/:id", async (req, res) => {
  const { id } = req.params; // Mendapatkan ID dari parameter URL
  try {
    // Menemukan proyek berdasarkan ID
    const activity = await Articles.findById(id).populate("writer");

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(activity); // Mengirimkan data proyek sebagai respons
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// endpoint untuk mendapatkan member articles berdasarkan ID member (MA = Member Article)
app.get("/ma/:id", async (req, res) => {
  const { id } = req.params; // minta id dari url frontend
  try {
    const articles = await Articles.find({ writer: id }).populate("writer");
    if (!articles) {
      return res
        .status(404)
        .json({ message: "Articles by this member is not found" });
    }
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// endpoint untuk mendapatkan article berdasarkan type
app.get("/article/type/:name", async (req, res) => {
  const { name } = req.params; // minta type dari url frontend
  try {
    const articles = await Articles.find({ type: name }).populate("writer");
    if (!articles) {
      return res
        .status(404)
        .json({ message: "Articles by this member is not found" });
    }
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CMS

// delete
app.delete("/delete/project/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Project.findByIdAndDelete(id);
    res.status(200).send({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting project', error });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
