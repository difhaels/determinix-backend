const mongoose = require("mongoose");
const Articles = require("./models/articles"); // Asumsi Anda memiliki model Project
const Admin = require("./models/Admin");

const articlesData = [
  {
    username: "admin_dx",
    password: "pw_dx_123",
    role: "admin"
  }
];

const insertProjects = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/determinix", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const result = await Admin.insertMany(articlesData);
    console.log("Projects inserted:", result);

    mongoose.disconnect(); // Tutup koneksi setelah selesai
  } catch (error) {
    console.error("Error inserting projects:", error.message);
  }
};

insertProjects();
