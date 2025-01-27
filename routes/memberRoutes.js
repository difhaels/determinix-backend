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

module.exports = router;