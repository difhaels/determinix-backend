const Activity = require("../models/activity");

const getAllActivity = async (req, res) => {
  try {
    const projects = await Activity.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getActivityById = async (req, res) => {
  const { id } = req.params; // Mendapatkan ID dari parameter URL
  try {
    // Menemukan proyek berdasarkan ID
    const activity = await Activity.findById(id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(activity); // Mengirimkan data proyek sebagai respons
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteActivity = async (req, res) => {
  const { id } = req.params;
  try {
    await Activity.findByIdAndDelete(id);
    res.status(200).send({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting Activity", error });
  }
};

module.exports = { getAllActivity, getActivityById, deleteActivity };
