const express = require("express");
const router = express.Router();
const {
  getAllProject,
  getProjectById,
  getProjectByMember,
  deleteProject,
} = require("../controllers/projectController");

// rute untuk mendapatkan semua project
router.get("/", getAllProject);

// rute untuk mendapatkan project sesuai id
router.get("/:id", getProjectById);

// rute untuk mendapatkan project berdasarkan id member
router.get("/mp/:id", getProjectByMember);

// delete project
router.delete("/:id", deleteProject);

module.exports = router;
