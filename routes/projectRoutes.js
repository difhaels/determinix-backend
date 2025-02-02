const express = require("express");
const router = express.Router();
const {
  getAllProject,
  getProjectById,
  getProjectByMember,
  deleteProject,
  addProject,
} = require("../controllers/projectController");
const upload = require("../middleware/multer");

// rute untuk mendapatkan semua project
router.get("/", getAllProject);

// rute untuk mendapatkan project sesuai id
router.get("/:id", getProjectById);

// rute untuk mendapatkan project berdasarkan id member
router.get("/mp/:id", getProjectByMember);

// delete project
router.delete("/:id", deleteProject);

// add project
router.post('/',upload.array("images", 5), addProject);

module.exports = router;
