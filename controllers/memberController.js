const Member = require("../models/member");

const getAllMember = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMemberById = async (req, res) => {
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
};

module.exports = { getAllMember, getMemberById };
