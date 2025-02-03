const Project = require("../models/project");
const cloudinary = require("../config/cloudinary");

const getAllProject = async (req, res) => {
  try {
    const projects = await Project.find().populate("members"); // Populate untuk menampilkan data member
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjectById = async (req, res) => {
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
};

const getProjectByMember = async (req, res) => {
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
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await Project.findByIdAndDelete(id);
    res.status(200).send({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting project", error });
  }
};

const addProject = async (req, res) => {
  try {
    const { title, description, members, att1, att2, att3 } = req.body;

    console.log("Req Files:", req.files); // Debugging
    console.log("Req Body:", req.body);   // Debugging

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Upload ke Cloudinary
    const uploadedImages = [];
    for (let file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "/projects",
      });
      uploadedImages.push(result.secure_url);
    }

    // Simpan ke MongoDB
    const newProject = new Project({
      title,
      description,
      members: JSON.parse(members), // Konversi dari string ke array
      imgUrl: uploadedImages,
      att1,
      att2,
      att3
    });

    await newProject.save();
    res.status(201).json({ message: "Project created successfully!", project: newProject });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating project", error: err });
  }
};

module.exports = {
  getAllProject,
  getProjectById,
  getProjectByMember,
  deleteProject,
  addProject
};
