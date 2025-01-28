const express = require("express");
const router = express.Router();
const Member = require("../models/member");

router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params; // Mendapatkan ID dari parameter URL
  try {
    // Menemukan proyek berdasarkan ID dan meng-populate data anggota
    const project = await Member.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json(project); // Mengirimkan data proyek sebagai respons
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
