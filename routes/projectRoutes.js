const express = require("express");
const router = express.Router();
const Project = require("../models/project");

// rute untuk mendapatkan semua project
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate("members"); // Populate untuk menampilkan data member
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// rute untuk mendapatkan project sesuai id
router.get("/:id", async (req, res) => {
  const { id } = req.params; // Mendapatkan ID dari parameter URL
  try {
    // Menemukan proyek berdasarkan ID dan meng-populate data anggota
    const project = await Project.findById(id).populate("members");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project); // Mengirimkan data proyek sebagai respons
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// rute untuk mendapatkan project berdasarkan id member
router.get("/mp/:id", async (req, res) => {
  const { id } = req.params; // minta id dari url frontend
  try {
    const projects = await Project.find({ members: id }).populate("members");
    if (!projects) {
      return res
        .status(404)
        .json({ message: "Projects by this member is not found" });
    }
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete project
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Project.findByIdAndDelete(id);
    res.status(200).send({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting project", error });
  }
});

module.exports = router;