const express = require("express");
const router = express.Router();
const {getAllActivity, getActivityById} = require('../controllers/activityController')

// mendapatkan semua activities
router.get("/", getAllActivity);

// mendapatkan activity berdasarkan id
router.get("/:id", getActivityById)

module.exports = router;