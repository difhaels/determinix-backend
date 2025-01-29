const express = require("express");
const router = express.Router();
const Activities = require("../models/activities");

// mendapatkan semua activities
router.get("/", async (req, res) => {
  try {
    const projects = await Activities.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// mendapatkan activity berdasarkan id
router.get("/:id", async (req, res) => {
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
})

module.exports = router;