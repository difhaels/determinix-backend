const express = require("express");
const router = express.Router();
const {getAllActivity, getActivityById, deleteActivity} = require('../controllers/activityController')

// mendapatkan semua activities
router.get("/", getAllActivity);

// mendapatkan activity berdasarkan id
router.get("/:id", getActivityById)

// delete Activity
router.delete("/:id", deleteActivity);

module.exports = router;