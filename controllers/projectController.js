const Project = require("../models/project");
const cloudinary = require("../config/cloudinary");

const getAllProject = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("head") // Populate head (ketua proyek)
      .populate("contributor"); // Populate contributor (anggota proyek)
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
    const {
      title,
      description,
      head,
      contributor,
      att1description,
      att2description,
      att3description,
    } = req.body;

    console.log("Req Files:", req.files); // Debugging
    console.log("Req Body:", req.body); // Debugging

    const bannerUrl = req.files["banner"]
      ? (
          await cloudinary.uploader.upload(req.files["banner"][0].path, {
            folder: "/projects",
          })
        ).secure_url
      : null;

    // Upload att1, att2, att3 jika tersedia
    const att1Url = req.files["imgAtt1"]
      ? (
          await cloudinary.uploader.upload(req.files["imgAtt1"][0].path, {
            folder: "/projects",
          })
        ).secure_url
      : null;
    const att2Url = req.files["imgAtt2"]
      ? (
          await cloudinary.uploader.upload(req.files["imgAtt2"][0].path, {
            folder: "/projects",
          })
        ).secure_url
      : null;
    const att3Url = req.files["imgAtt3"]
      ? (
          await cloudinary.uploader.upload(req.files["imgAtt3"][0].path, {
            folder: "/projects",
          })
        ).secure_url
      : null;

    // Simpan ke MongoDB
    const newProject = new Project({
      title,
      description,
      head,
      contributor: JSON.parse(contributor), // Konversi dari string ke array
      banner: bannerUrl,
      imgAtt1: att1Url,
      imgAtt2: att2Url,
      imgAtt3: att3Url,
      att1description,
      att2description,
      att3description,
    });

    await newProject.save();
    res
      .status(201)
      .json({ message: "Project created successfully!", project: newProject });
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
  addProject,
};
